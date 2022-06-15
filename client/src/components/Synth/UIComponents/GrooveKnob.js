import { useState, useEffect } from "react";
import { Donut, HighContrast } from "react-dial-knob"

const GrooveKnob = ({diameter, min, max, step, valueDial, setValueDial}) => {
    const [value, setValue] = useState();
    useEffect(() => {
        setValueDial(value)
    },[value])
    return(<>
        <HighContrast
        diameter={diameter}
        min={min}
        max={max}
        step={step}
        value={value}
            theme={{
                activeColor: 'pink',
                defaultColor: '#e2ed7e'
            }}
        onValueChange={setValue}
    >
    </HighContrast>
    </>)
}

export default GrooveKnob;