import { createUseStyles } from 'react-jss';
import React, { useRef } from 'react';

export default function ShadowGeneratorInput(props) {
    const styles = createUseStyles({
        inputSlider: {
            border: '1px solid rgb(175, 175, 175)',
            background: 'rgb(190, 190, 190)',
            'border-radius': '1rem',
            appearance: 'none',
            height: '0.5rem',
            '&::-webkit-slider-thumb': {
                border: '1px solid rgb(190, 190, 190)',
                'border-radius': '50%',
                background: 'white',
                appearance: 'none',
                height: '1.5rem',
                width: '1.5rem',
            }
        },
    });
    const classes = styles();
    const input = useRef();

    function reset() {
        input.current.value = props.default;
        props.setter(props.default);
    }

    return (
        <div className={classes.shadowInputsWrapper}>
            <input 
                className={classes.inputSlider} onChange={(e) => props.setter(e.target.value)} ref={input}
                type="range" min={props.min} max={props.max} defaultValue={props.default}
            />
            <button onClick={reset}>Reset</button>
        </div>
    );
}