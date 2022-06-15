import { midiToFreq } from "@tonaljs/midi";
import styled from "styled-components";

const KeyBoard = ({setFreqPlay, playTone, freqPlay, setStopNote, oscList}) => {
    const handleClick = (e) => {
        const notetoPlay = (Number(e.target.value) + 57)
        console.log(notetoPlay)
        console.log(midiToFreq(notetoPlay))
        oscList[e.target.value][notetoPlay] = playTone(midiToFreq(notetoPlay));
        setTimeout(()=> {setStopNote(e.target.value, notetoPlay)}, 200);
    };

    return(
        <Wrapper>
            {[...Array(16)].map((note,index) => {
                return(<>
                    <KeyButton 
                        key={index}
                        value={index}
                        onClick={(e) => handleClick(e)}
                        />
                </>)
            })}
        </Wrapper>)
}

const KeyButton = styled.button`
height:250px;
width:40px;
`
const Wrapper = styled.div`
    display: flex;
`

export default KeyBoard;