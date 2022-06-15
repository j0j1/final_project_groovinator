const Bpm = ({setBpm}) => {
    const min = 60
    return ( <>
        <h4>BPM</h4>
        <input type={"number"} min={20} max={300} defaultValue={120} onChange={(e) => setBpm(e.target.value)}/>

    </>)
}

export default Bpm