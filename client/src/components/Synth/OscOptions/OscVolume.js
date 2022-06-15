import GrooveKnob from "../UIComponents/GrooveKnob";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti'
const OscVolume = ({oscVol, setOscVol, oscNo}) => {
    const [value, setValue] = useState();
    // useEffect(() => {
    //     // setOscVol(valueDial)
    // },[valueDial])

    const increment = () => {
        if (oscVol < 2.0){
            const newVal = (Number(oscVol))
            setOscVol(newVal+0.01)
        }
    }

    const decrement = () => {
        if (oscVol > 0){
            const newVal = (Number(oscVol))
            setOscVol(newVal-0.01)
        }
    }

    return (<>
        <VolBox>
            <DisplayBox>
                <VolTitle>VOLUME</VolTitle>
                <Vol>{(Math.round(oscVol*100)/100)}</Vol>
            </DisplayBox>
            <ButtonBox>
                <VolButton onClick={increment}><TiArrowSortedUp/></VolButton>
                <VolButton onClick={decrement}><TiArrowSortedDown/></VolButton>
            </ButtonBox>
        </VolBox>
    </>)
}

const VolBox = styled.div`
    font-family: 'Kdam Thmor Pro', sans-serif;
    width:150px;
    display:flex;
    justify-content: center;
    padding-right: 15px;
`
const DisplayBox =styled.div`
    width:60%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    gap:10px;
`
const VolTitle = styled.h2`
`
const Vol = styled.div`
    font-family: 'Kdam Thmor Pro', sans-serif;
    font-size: 30px;
`
const ButtonBox = styled.div`
    padding-top: 10px;
    width:30%;
`
const VolButton = styled.button`
    font-size: 40px;
    padding:0;
    background: none;
    border:solid var(--mainColor) 1px;
    color:var(--mainColor);
    height:37px;
    & :hover{
        color: pink;
    }
`



export default OscVolume;