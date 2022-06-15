import { TbWaveSquare, TbWaveSine, TbWaveSawTool } from "react-icons/tb";
import { FiActivity } from "react-icons/fi";
import styled from "styled-components";
import { useEffect, useState } from "react";

const WavePicker = ({setWaveForm, waveForm, oscNo, synthReload}) => {
    const [waveTrue, setWaveTrue] = useState(false);
    console.log(waveForm)
    useEffect(() =>{
        console.log("trigger")
    
    },[waveTrue])

    const handleCheck = (wave) => {
        setWaveTrue(true)
    }
    const handleClick = (e) => {
        console.log(e)
    setWaveForm(waveForm, waveForm[oscNo]=e)
    setWaveTrue(!waveTrue)
    }
    return (
        <Wrapper>
            <Option>
                <Wave  name={oscNo} value="sine" waveForm={waveForm} className={waveForm==="sine"&& "checked"} onClick={(e)=> handleClick(e.target.value)}
                            style={{background:waveForm[oscNo]==="sine"&&"pink"}}/>
                <TbWaveSine/>
            </Option>
            <Option>
                <Wave name={oscNo} value="triangle" className={waveForm[oscNo]==="triangle"&& "checked"} onClick={(e)=> handleClick(e.target.value)}
                style={{background:waveForm[oscNo]==="triangle"&&"pink"}}/>
                <FiActivity/>
            </Option>
            <Option>
                <Wave  name={oscNo} value="square" className={waveForm==="square"&& "checked"} onClick={(e)=> handleClick(e.target.value)}
                style={{background:waveForm[oscNo]==="square"&&"pink"}}/>
                <TbWaveSquare/>
            </Option>
            <Option>
                <Wave  name={oscNo} value="sawtooth" className={"active"} onClick={(e)=> handleClick(e.target.value)}
                style={{background:waveForm[oscNo]==="sawtooth"&&"pink"}}/>
                <TbWaveSawTool/>
            </Option>
        </Wrapper>
    )

}

const Wrapper = styled.div`
    display:flex;
    justify-content: space-between;
`

const Option = styled.div `
    font-size: 25px;
    padding:5px;
    padding-left: 2px;
`

const Wave = styled.button`
    height:15px;
    width:15px;
    border-radius: 100%;
    background: none;
    border:var(--mainColor) solid 1px;

`

export default WavePicker;