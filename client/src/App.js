import Synth from "./components/Synth/Synth";
import { FiActivity } from "react-icons/fi";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <GrooveContainer>
        <Logo>
        <MyFiActivity/>
        <Title>groovinator</Title>
        <MyFiActivity/>
        </Logo>
        <Synth/>
        
      </GrooveContainer>
  
    </>
  );
}

const Logo = styled.div`
  margin-top: -50px;
  
  width:fit-content;
  padding: 0;
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
