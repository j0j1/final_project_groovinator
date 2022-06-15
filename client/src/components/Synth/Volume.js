const Volume = ({setVolume}) => {

    return (<>
        <span>Volume:</span>
        <input 
            type={'range'}
            min={0.0}
            max={1.0}
            step={0.01}
            defaultValue={0.5}
            onChange={(e) => setVolume(e.target.value)}>
            </input>
    </>)
}

export default Volume;