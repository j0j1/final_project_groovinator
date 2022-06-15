import styled from "styled-components"
import { useState } from "react";

const ButtonDial = ({setSequenceTrigger, sequence, currentStep}) => {
    const [localOctave, setLocalOctave] = useState([3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]);
    const degree = 360/12;
    const triColor = ['violet', 'blue', 'green', 'yellow', 'orange', 'red', 'pink', 'hot-pink'];
    const handleOctave = (e, step, num) => {
        e.preventDefault();
        console.log(localOctave[step])
       
        if (localOctave[step] >= 0 && localOctave[step] <= 8){
            setLocalOctave(localOctave, localOctave[step]+=num)
        }
        if (localOctave[step]===-1){
            setLocalOctave(localOctave, localOctave[step]=0)
        }
        if (localOctave[step]===9){
            setLocalOctave(localOctave, localOctave[step]=8)
        }
    }

    const handleClick = (e,j) => {
        // console.log (e.target.value, "EEEE")
        // console.log (j, "iiii")
        console.log(localOctave[j])
        setSequenceTrigger(j, e.target.value, localOctave[j]);
    }

    return (
        <>
        <Wrapper>

        {sequence.map((step, j) => {
            // console.log(step)
            return (<>
                <TrigContainer>
                <TrigLight style={{background: currentStep ===j && "red"}}/>
                <ButtonCircle>
                <OctaveWrapper>
                    <OctaveChange onClick={(e) => handleOctave(e, step.step, 1)}><TriUp style ={{borderBottom: `15px solid ${triColor[localOctave[j]]}`}}/></OctaveChange>
                    <OctaveChange onClick={(e) => handleOctave(e, step.step, -1)} ><TriDown style ={{borderTop: `15px solid ${triColor[localOctave[j]]}`}}/></OctaveChange>
                </OctaveWrapper>
                    {[...Array(12)].map((b, i) => {
                        return <InputButton 
                        
                                    onClick={(e) => handleClick(e, j)}
                                    className= {step.active && step.note === i && "active"}
                                    // type={"radio"}
                                    // name={`step${j}`}
                                    value={i}
                                    style={{
                                        background: step.active === true && Number(step.note) ===i && "pink",
                                        transform: `rotate(${i*degree-90}deg) translate(30px)`
                                        
                                    }}>
                                </InputButton>
                    })}
                </ButtonCircle>
                </TrigContainer>

            </>)
        })}
        </Wrapper>
    </>)
}

const Wrapper = styled.div`
    display:flex;
    flex-wrap: wrap;
    width:750px;
`

const ButtonCircle = styled.div`
    height:78px;
    width:78px;
    background:grey;
    border-radius: 50%;
    position:relative;
    margin:5px;
    translate:rotate(-50deg);
    & .octave3 {
        background: red;
    }
`
const InputButton = styled.button`
    border:none;
    background:white;
    width: 5px;
    height: 5px;
    position: absolute;
    left:29px;
    top:29px;
    border-radius:50%;
    margin-left: 3px;
    margin-top: 5px;

    &.active {
        background: red;
    }

`
const OctaveWrapper = styled.div`
    display:flex;
    flex-direction: column;
    margin:auto;
    margin-top:20%;
    width:60%;
    justify-content: space-between;
    height:40px;
`
const OctaveChange = styled.button`
    background: none;
    border: none;
 `
const OctaveDown = styled.button`
    height:10px;
`
const TriUp = styled.div`
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    

`
const TriDown = styled.div`
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-top: 15px solid orange;
`
const TrigLight = styled.div`
    height: 3px;
    width:3px;
    border-radius: 50px;
    border: black solid 2px;
`

const TrigContainer = styled.div`
    display:flex;
    flex-direction: column;
`

export default ButtonDial