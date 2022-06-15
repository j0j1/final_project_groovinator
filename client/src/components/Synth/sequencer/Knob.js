import styled from "styled-components";
import { CircularInput, CircularThumb, CircularTrack, CircularProgress } from 'react-circular-input'
import { useContext, useEffect, useState } from "react";
import { SynthContext } from "../../SynthContext";

const Knob = ({setSequenceTrigger, sequence, currentStep}) => {
    // const {setSequenceTrigger, noteValue, setNoteValue} = useContext(SynthContext);
    const [selectVal, setSelectVal] = useState();
    const [stepNo, setStepNo] = useState()
    const [value, setValue] = useState(0.25);
    const stepValue = v => Math.round(v*12)/12;
    const octave = 3;
    
    

    const handleChange = (v, j) => {
        console.log(v.target.step)
        setValue(stepValue(v))
        // setNoteValue(v);
        setSequenceTrigger(j, value, octave)
    }

    const handleSelect = (e, j) => {
        console.log(j)
        // setSelectVal(e.target.value)
        // setNoteValue(e.target.value)
        setSequenceTrigger(j, e.target.value, octave)
    }

    return(<>
        {sequence.map((knob, j) => {
            return(            <>

            <Selector  onChange={(e) => handleSelect(e, j)}
                style={{background: sequence[j].active === true && "pink",
                color: currentStep===j && "red"}}>
                {[...Array(12)].map((op,i) => {
                    return <option value={i+1}>{i+1}</option>
                })}
            </Selector>
            </>)
        })}
    </>)
}
const Selector = styled.select `
    padding: 20px;
`


export default Knob;