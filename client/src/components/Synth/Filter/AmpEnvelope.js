import styled from "styled-components";

const AmpEnvelope = ({setAttack, setRelease, setSustain, setDecay}) => {
    return(
        <Wrapper className="borderSection">
        <h4>AMP</h4>
        <div style={{paddingTop:"15px"}}>
        <AmpInput> 
            <h1>ATTACK</h1>
            <input
                onChange={(e) => setAttack(e.target.value)}
                type={"range"}
                min={0.001}
                max={1.000}
                step={0.001}
                />
        </AmpInput>
        <AmpInput>
        <h3>RELEASE</h3>
        <input
            onChange={(e) => setRelease(e.target.value)}
            type={"range"}
            min={0.001}
            max={1.000}
            step={0.001}
            />
        </AmpInput>
        </div>
        </Wrapper>
    )
}

const AmpInput=styled.div`
    padding-top: 10px;
`

const Wrapper = styled.div`
`

export default AmpEnvelope;