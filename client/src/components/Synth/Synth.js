import { useEffect, useState } from "react";
import styled from 'styled-components'
import Volume from "./Volume"
import WavePicker from "./OscOptions/WavePicker"
import Filter from "./Filter/Filter"
import Sequencer from "./sequencer/Sequencer";
import OscTuner from "./OscOptions/OscTuner";
import AmpEnvelope from "./Filter/AmpEnvelope"
import { midiToFreq } from "@tonaljs/midi";


const Synth = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const [volume, setVolume] = useState(1.0);
    const [waveForm, setWaveForm] = useState([ "sine", "saw" ]);
    const [oscOctave, setOscOctave] = useState([ 0, 0 ]);
    const [oscPitch, setOscPitch] = useState ([0, 0]);
    const [oscVol1, setOscVol1] = useState (0.5);
    const [oscVol2, setOscVol2] = useState(0.5)
    const [filtType, setFiltType] = useState ("lowpass");
    const [filtFreq, setFiltFreq] = useState ("350")
    const [resonance, setResonance] = useState (0)
    const [freqPlay, setFreqPlay] = useState();
    const [attack, setAttack] = useState(0.001);
    const [release, setRelease] = useState(0.001);
    const [synthsPresets, setSynthsPresets] = useState([]);
    const [synthsLoad, setSynthsLoad] = useState(false);
    const [synthsReload, setSynthsreLoad] = useState(true);
    const [synthReload, setSynthReload] = useState(true);
    const [synthName, setSynthName] = useState("");
    const [nameError, setNameError] = useState(false)
    let oscList1 = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];
    let oscList2 = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},];
    let envList = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},]
    let mainGainNode = null

    useEffect(() => {
        fetch('/synth/getsynths')
        .then((res) => res.json())
        .then((data) => {
            setSynthsPresets(data.data);
            setSynthsLoad(true);
        })
    },[synthsReload]);

    useEffect(() =>{
        changeFilter()
    }, [filtType, filtFreq, resonance, oscVol1, oscVol2])

        mainGainNode = audioContext.createGain();
        mainGainNode.connect(audioContext.destination);
        mainGainNode.gain.value = 0.5;
        const osc1Gain = new GainNode(audioContext);
        osc1Gain.gain.value = oscVol1;
        const osc2Gain = new GainNode(audioContext);
        console.log(oscVol2)
        osc2Gain.gain.value= oscVol2;
        const sineTerms = new Float32Array ([ 0, 0, 1, 0, 1]);
        const cosineTerms = new Float32Array (sineTerms.length);
        const filter = audioContext.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 350;

    const changeFilter = () => {
        filter.type = filtType;
        filter.frequency.value = filtFreq;
        filter.Q.value = resonance*filtFreq*0.015;
        osc1Gain.value = oscVol1
        osc2Gain.value = oscVol2
    }

    const startEnvelope = (now, a, r, i) => {
        envList[i] = new GainNode(audioContext)
        setTimeout(() => {envList[i] = null}, a + r + 1000 ); 
        envList[i].gain.setValueAtTime(0, now);
        envList[i].gain.linearRampToValueAtTime(1, now+a);
        envList[i].gain.linearRampToValueAtTime(0, now+a+r);
        filter.connect(envList[i]);
        envList[i].connect(mainGainNode);
    }

    const playTone = (note, oscNo, i) => {
        const osc = audioContext.createOscillator();
        const octavate = oscOctave[oscNo]*12+note;
        const detune = oscPitch[oscNo]*.1;
        const freqRaw = midiToFreq(octavate)
        const freq = freqRaw-detune
        const now = audioContext.currentTime;
        const currentAttack=Number(attack);
        const currentRelease=Number(release);
        if (oscNo===0){
            osc.connect(osc1Gain).connect(filter);
        } else {
            osc.connect(osc2Gain).connect(filter);
        }
        osc.type = waveForm[oscNo]
        osc.frequency.value = freq;
        startEnvelope(now, currentAttack, currentRelease, i)
        osc.start();
        return osc
    }

    const setStopNote = (e, note) => {
        oscList1[e][note].stop();
        oscList2[e][note].stop();
        delete oscList1[e][note];
        delete oscList2[e][note]
    }

const saveSynth = (e) =>{
    e.preventDefault();
    if (synthName===""){
        setNameError(true);
    } else {
    fetch("/synth/post", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            name: synthName,
            waveForm: waveForm,
            oscOctave: oscOctave,
            attack: attack,
            release: release,
            oscVol1: oscVol1,
            oscVol2: oscVol2,
            filtType: filtType,
            filtFreq: filtFreq,
            resonance: resonance,
        })
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.status === 200){
            setSynthsLoad(false);
            setSynthsreLoad(!synthsReload);
            window.alert(`synth ${synthName} save success`)
        } else {
            window.alert(`something bad happened and synth ${synthName} could not be saved`)
        }
    })
    }
}

const handleSynthSelect = (e) => {
        console.log(e.target.value)
        synthsPresets.forEach((preset) => {
            if (e.target.value === preset.name) {
                setWaveForm(preset.waveForm);
                setFiltFreq(preset.filtFreq);
                setResonance(preset.resonance);
                setFiltType(preset.filtType);
                setAttack(preset.attack);
                setRelease(preset.release);
                setOscVol1(preset.oscVol1);
                setOscVol2(preset.oscVol2);
                setOscOctave(preset.oscOctave);
                
            }
        setSynthReload(!synthReload)
        })
    }

    return (<>
        <Wrapper>
            <SynthContainer>
                <SectionTitle>SYNTH</SectionTitle>
            <VCOSection>
                <VCO>
                    <VCOTop>
                        <SectionSmallTitle>OSC I</SectionSmallTitle>
                        <WaveBox>
                            <WavePicker setWaveForm={setWaveForm} waveForm={waveForm} oscNo={0}/>
                        </WaveBox>
                    </VCOTop>
                    <OscTuner setOscOctave={setOscOctave} oscOctave={oscOctave} setOscPitch={setOscPitch} oscPitch={oscPitch} oscNo={0} oscVol={oscVol1} setOscVol={setOscVol1}/>
                </VCO>
                <VCO>
                    <VCOTop>
                        <SectionSmallTitle>OSC II</SectionSmallTitle>
                        <WaveBox>
                            <WavePicker setWaveForm={setWaveForm} waveForm={waveForm} oscNo={1} synthReload={synthReload}/>
                        </WaveBox>
                    </VCOTop>
                    <OscTuner setOscOctave={setOscOctave} oscOctave={oscOctave} setOscPitch={setOscPitch} oscPitch={oscPitch} oscNo={1} oscVol={oscVol2} setOscVol={setOscVol2}/>
                </VCO>
            </VCOSection>
            <BottomSection>
                <Filter setFiltFreq={setFiltFreq} filtFreq={filtFreq} setFiltType={setFiltType} setResonance={setResonance} resonance={resonance} filtType={filtType} synthReload={synthReload}/>
                <AmpEnvelope setAttack={setAttack} setRelease={setRelease}/>
                <PresetSection className="borderSection">
                    <PresetTitle>PRESETS</PresetTitle>
                    <PresetContents>
                        <div>
                        <h3>LOAD SYNTH</h3>
                            <select onChange={(e) => handleSynthSelect(e)}>
                            {synthsLoad
                                ? synthsPresets.map((preset) => { return (<option value={preset.name}>{preset.name}</option>)})
                                : <option>no preset available</option>}
                            </select>
                        </div>
                        <div>
                        <h3>SAVESYNTH</h3>
                        <input type={"text"} value={synthName} placeholder={"NAME YOUR SYNTH"} onChange={(e) => setSynthName(e.target.value) (setNameError(false))}></input>
                        </div>
                        <button className={"save"} onClick={(e) => saveSynth(e)}>SAVE</button>
                        {nameError && <h3 style={{color:"pink"}}>PLEASE ENTER A NAME</h3>}
                    </PresetContents>
                </PresetSection>
            </BottomSection>
            </SynthContainer>
            <Sequencer setFreqPlay={setFreqPlay} playTone={playTone} freqPlay={freqPlay} oscList1={oscList1} oscList2={oscList2} setStopNote={setStopNote}/>
            
        </Wrapper>
    </>)
}


const PresetTitle = styled.h4``

const PresetContents = styled.div`
    display:flex;
    flex-direction: column;
    gap:15px;
    padding-top: 10px;
`

const BottomSection = styled.div`
    display: flex;
`

const PresetSection = styled.div`
`
const VCOTop = styled.div`
    display:flex;
    justify-content: flex-start;
    padding-left: 30px;
    padding-bottom: 15px;
    padding-top:15px;
`
const SynthContainer = styled.div`
    border:pink 5px solid;
    border-radius: 15px;
    padding:5px;
`
const SectionTitle = styled.h2`
    margin-top: -18px;
    margin-left: 75%;
    font-weight: 600;
    background-color: var(--background);
    width:fit-content;
    padding:2px;
`
const SectionSmallTitle = styled.h3`
    font-family: 'Poiret One', cursive;
    font-size: 25px;
`
const VCO = styled.div`
    border:var(--mainColor) 1px solid;
    border-radius: 15px;
    padding-bottom: 10px;
    padding-right: 10px;
`
const VCOSection = styled.div`
display:flex;
`
const WaveBox = styled.div`
    padding-left: 25px;
`
const Presser = styled.div`
    height:100%;
    width:100%;
`
const Wrapper = styled.div`
    display:flex;
    flex-direction: column;
`

export default Synth;