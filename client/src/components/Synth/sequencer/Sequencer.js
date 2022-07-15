import { Midi, midiToFreq } from "@tonaljs/midi"
import styled from "styled-components"
import Knob from "./Knob"
import Bpm from './Bpm'
import ButtonDial from "./ButtonDial"
import { CircularInput, CircularProgress, CircularTrack, CircularThumb } from "react-circular-input"
import { useContext, useEffect, useState } from "react"
import PlayButton from "./PlayButton"
import { SequenceDefault } from "../../sequenceDefault"
import { SynthContext } from "../../SynthContext"


const Sequencer = ({playTone, setStopNote, oscList1, oscList2}) => {
    const [sequence, setSequence] = useState (SequenceDefault)
    const [playing, setPlaying] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [bpm, setBpm] = useState(120);
    const [sequencePresets, setSequencePresets] = useState([]);
    const [sequenceLoad, setSequenceLoad] = useState(false);
    const [sequenceReload, setSequenceReload] = useState(false)
    const [sequenceName, setSequenceName] = useState("");
    const [nameError, setNameError] = useState(false)

    useEffect(() => {
        fetch('/sequence/get-sequences')
        .then((res) => res.json())
        .then((data) => {
                setSequencePresets(data.data)
        })
    },[sequenceReload]);
    

    const setSequenceTrigger = (step, value, octave) => {
        const sequenceCopy = [...sequence];
        console.log(octave)
        // const note = value*12+octave*12;
        // console.log(note)
        if (value==="dont"){
            sequenceCopy[step].octave = octave
        }
        else if (sequenceCopy[step].note === value){
            sequence[step].active = !sequence[step].active;
        } 
        else {
            sequenceCopy[step].note = value;
            sequenceCopy[step].octave = octave;
            sequenceCopy[step].active = true;
        }
        console.log(sequenceCopy, "COOOOOOPPPYYY")
        setSequence(sequenceCopy)
    }

    const playTrigger = (note, octave, i) => {
        const notetoPlay = (Number(note)+octave*12)
        oscList1[i][notetoPlay] = playTone(notetoPlay, 0, i);
        oscList2[i][notetoPlay] = playTone(notetoPlay, 1, i);
        setTimeout(()=> {setStopNote(i, notetoPlay)}, 60000/bpm/4);
    };

    const nextStep = (hit) => {
        sequence.map((step, i) => {
            if (i===hit && step.active){
                console.log(i)
                console.log("HIT")
                playTrigger(step.note, step.octave, i)
            }
        })
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (playing) {
                setCurrentStep((currentStep +1) % 16);
                nextStep(currentStep);
            }
        }, 60000/bpm/4);
        return () => {
            clearTimeout(timer);
        }
    }, [currentStep, playing])

    const saveSequence = (e) => {
        e.preventDefault();
        if (sequenceName===""){
            setNameError(true)
        } else {
        fetch('/sequence/post',{
            method:"POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                sequenceName:sequenceName,
                sequence:sequence})
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.status === 200){
                setSequenceLoad(false);
                setSequenceReload(!sequenceReload);
                window.alert(`sequence ${sequenceName} save success`)
            } else {
                window.alert(`something bad happened and sequence ${sequenceName} could not be saved`)
            }
        })
        }
    }

    const handleSequenceSelect = (e) => {
        const loadSequence = sequencePresets.filter((preset) => {
            return preset.sequenceName === e.target.value

        })
        setSequence(loadSequence[0].sequence)
    }

    return(<>
        <Wrapper className="">
        <SectionTitle>SEQUENCER</SectionTitle>
        <TopSection>
            <PlaySection className="borderSection">
           
                <PlayButton style={{padding:"20px"}} playing={playing} onClick={() => setPlaying(!playing)} />
                <div style={{display:'flex'}}>
                <Bpm setBpm={setBpm }></Bpm>
            </div>
            </PlaySection>
            <PlaySection className="borderSection">
            <h4>PRESETS</h4>
            <MiniSection>
            <h3>LOAD SEQUENCE</h3>
            <select onClick={(e) => handleSequenceSelect(e)}> {sequencePresets.map((sequence) => {
                return <option value={sequence.sequenceName}>{sequence.sequenceName}</option>
            })}</select> 
            </MiniSection>
            <MiniSection>
            <h3>SAVE SEQUENCE</h3>
            <input type={"text"} value={sequenceName} placeholder={"NAME YOUR SEQUENCE"} onChange={(e) => setSequenceName(e.target.value) (setNameError(false))}></input>
            </MiniSection>
            <MiniSection>
            <button onClick={(e) => saveSequence(e)}>SAVE</button>
            {nameError&&<h3> MUST HAVE NAME</h3>}
            </MiniSection>
            </PlaySection>
        </TopSection>
        <BottomSection>

        <ButtonDial sequence={sequence} currentStep={currentStep} setSequenceTrigger={setSequenceTrigger}></ButtonDial>
        </BottomSection>
        </Wrapper>
    </>)
};

const MiniSection = styled.div`

`
const PlaySection = styled.div`
    display:flex;
    gap: 10px;

`
const TopSection =styled.div`
    display:flex;
`
const BottomSection = styled.div``

const SectionTitle = styled.h2`
    margin-top: -18px;
    margin-left: 75%;
    font-weight: 600;
    background-color: var(--background);
    width:fit-content;
    padding:2px;
`
const Wrapper = styled.div`
    border:pink 5px solid;
    border-radius: 15px;
    padding:5px;
    margin-top: 20px;
`

export default Sequencer;