import styled from "styled-components";
import OscVolume from "./OscVolume";
import { Donut, HighContrast } from "react-dial-knob"
import { useEffect, useState } from "react";
import Knob, {SkinWrap, KnobProps, composeTwo, useAngleUpdater} from 'react-dial-knob'
import GrooveKnob from "../UIComponents/GrooveKnob";


const OscTuner = ({setOscOctave, oscOctave, setOscPitch, oscPitch, setOscVol, oscVol, oscNo}) => {
    const mainColor = '#e2ed7e';
    // console.log(oscVol)
    const [donutState, setDonutState] = useState(0);
    const [valueDial, setValueDial] = useState(5);

    const handleOctaveDonut = (e) => {
        console.log(e.target.value)
    }
    useEffect(() => {
        setOscOctave(oscOctave, oscOctave[oscNo]=donutState)
    },[donutState]);

    useEffect(() => {
        console.log(oscPitch*0.1, "VALUUUEE")
        setOscPitch(oscPitch, oscPitch[oscNo]=valueDial)
    },[valueDial])
  

    return(
    <Wrapper>
        <OscVolume oscVol={oscVol} setOscVol={setOscVol} oscNo={oscNo}></OscVolume>

        <Tuner>
            <DialContainer>
                <InputTitle>DETUNE</InputTitle>
                <DialWNumber>
                    <HighContrast
                        diameter={75}
                        min={-50}
                        max={50}
                        step={1}
                        value={valueDial}
                            theme={{
                                activeColor: 'pink',
                                defaultColor: '#e2ed7e'
                            }}
                        onValueChange={setValueDial}
                    >
                    </HighContrast>
                </DialWNumber>
            </DialContainer>
            <DialContainer>
                <InputTitle>OCTAVE</InputTitle>
                <DialWNumber>
                    <HighContrast
                        diameter={75}
                        min={-3}
                        max={3}
                        step={1}
                        value={donutState}
                            theme={{
                                activeColor: 'pink',
                                defaultColor: '#e2ed7e'
                            }}
                        onValueChange={setDonutState}
                    >
                    </HighContrast>
                </DialWNumber>
            </DialContainer>
        </Tuner>
    </Wrapper>)
}

const DialNumber = styled.div`
    /* z-index: 1000; */
    /* font-size: 50px; */
    /* color:red; */
    /* margin-top:-100px; */
    /* left:5px; */
`
const DialContainer = styled.div`
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding:5px;
`
const Wrapper = styled.div`
display:flex;
`
const Tuner = styled.div`
    display:flex;
`
const InputTitle = styled.h3`
    width:fit-content;
    font-weight: 100;
    text-align: center;
    padding-bottom: 10px;
`
const DialWNumber = styled.div`
    /* margin-top: -15px; */
`

export default OscTuner;