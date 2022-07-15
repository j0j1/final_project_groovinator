import Synth from "./components/Synth/Synth";
import { FiActivity } from "react-icons/fi";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import { padding } from "@mui/system";
import { TbLetterF } from "react-icons/tb";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <GrooveContainer>
          <Logo>
            <MyFiActivity style={{background: '#2f2c30'}}/>
            <MaskDiv/>
            <Title>groovinator</Title>
            <MyFiActivity style={{background: '#2f2c30'}}/>
            <MaskDiv style={{left:'720px'}}/>
          </Logo>
        <Synth/>
        
      </GrooveContainer>
  
    </>
  );
}

const MaskDiv = styled.div`
position:absolute;
top: 50px;
height: 5px;
width:10px;
background: var(--mainColor);

`

const Logo = styled.div`
  margin-top: -50.5px;
  width:fit-content;
  padding: 0;
  padding-bottom: 5px;
  display: flex;
`
const Title = styled.h1`
  background: var(--background);
  margin-top: 5px;
  padding:5px;
  font-size: 50px;
`

const GrooveContainer = styled.div`
  width:fit-content;
  margin:auto;
  margin-top:50px;
  border:var(--mainColor) 5px solid;
  border-radius: 15px;
  padding:20px;
`
const MyFiActivity = styled(FiActivity)`
  font-size:57px;

`
export default App;
