import styled from "styled-components";
import { useRadioGroup, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { useEffect, useState } from "react";
import { CircularInput, CircularTrack, CircularThumb, CircularProgress } from "react-circular-input";

const Filter = ({setFiltType, setFiltFreq, filtFreq, setResonance, filtType, synthReload, resonance}) => {
    console.log(filtType)
    const filtOptions = ["lowpass", "bandpass", "highpass"]
    const [value, setValue] = useState();
    const [resValue, setResValue] = useState();

    useEffect(() =>{
      setValue(filtFreq);
      setResValue(resonance)
    },[synthReload])

    const handleChange = (e) => {
        setFiltType(e.target.value)
    }
    return(
    <Wrapper className={"borderSection"}>
        <SectionTitle>FILTER</SectionTitle>
        <FiltType>
        {filtOptions.map((filtOption)=> {
            return(<>
                <OptionFilt>
                    <FiltLabel>{filtOption==="lowpass" ? "LP" : filtOption==="bandpass" ? "BP" : filtOption==="highpass" && "HP"}</FiltLabel>
                    <FiltButton value={filtOption} onClick={(e) => setFiltType(e.target.value)} style={{background:filtOption===filtType&&"pink"}}/>
                </OptionFilt>
            </>)
        })}
        </FiltType>
        <FiltLabel>CUTOFF</FiltLabel>
        <input
            className={value}
            onClick={(e) => setFiltFreq(e.target.value)}
            type={"range"}
            min={0}
            max={1000}
            step={1}
            defaultValue={value}
            >
        </input>
        <FiltLabel>RESONANCE</FiltLabel>
        <input
            onClick={(e) => setResonance(e.target.value)}
            type={"range"}
            min={0}
            max={2}
            step={0.1}
            defaultValue={resValue}
            >
        </input>
    </Wrapper>
    )
}

const OptionFilt = styled.div`
    padding: 2px;
`

const FiltType = styled.div`
    display:flex;
    justify-content: space-around;
    width:100%;
    padding: 1px;
    padding-top: 10px;
`
const SectionTitle = styled.h4`
`

const FiltLabel = styled.h3`
    font-weight: 400;
    padding-top:15px;
`
const FiltButton = styled.button`
    height:15px;
    width:15px;
    border-radius: 100%;
    background: none;
    border:var(--mainColor) solid 1px;
`
const Wrapper = styled.div``

export default Filter;