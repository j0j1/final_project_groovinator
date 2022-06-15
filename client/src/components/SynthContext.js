import { createContext, useContext, useEffect, useState, useReducer } from "react";
import { SequenceDefault } from "./sequenceDefault";
export const SynthContext = createContext(null);

// const initialState = {
//     status: "idle",
//     sequence:SequenceDefault
// }

// const ACTIONS = {
//     SET_TRIGGER: 'set-trigger'
// }

// const reducer = (state, action) => {
//     switch (action.type) {
//         case ACTIONS.SET_TRIGGER: {
//             console.log(typeof action.payLoad.step)
//             console.log (state.sequence[1])
//             return {
//                 // ...state.sequence[action.payLoad.step]
//             }
//         }
//     }
// }

const SynthProvider = ({ children }) => {
    // const [state , dispatch] = useReducer(reducer, initialState);
    const [noteValue, setNoteValue] = useState();
    const [sequence, setSequence] = useState(SequenceDefault);
    // console.log(state.sequence)

    const setSequenceTrigger = (step, value, octave) => {
        const note = value*12+octave*12
        console.log( "noootttee" )
        // setSequence
        setSequence(sequence, sequence[step].note=value);
        setSequence()
        console.log(sequence,"hiewhiwheihwiehi")
    }
    
    return (
        <SynthContext.Provider
            value={{
                // playTrigger,
                setSequenceTrigger,
                noteValue,
                setNoteValue
            }}
        >
            {children}
        </SynthContext.Provider>
    )
}

export default SynthProvider