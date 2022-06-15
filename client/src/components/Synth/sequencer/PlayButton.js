import styled from "styled-components"
import { BsPauseFill, BsFillPlayFill } from 'react-icons/bs'

const PlayButton = ({playing, onClick}) => {
        return(  <button className={'save'} onClick={onClick}>{playing ? <BsPauseFill/>: <BsFillPlayFill/>}</button>)
}

export default PlayButton;

