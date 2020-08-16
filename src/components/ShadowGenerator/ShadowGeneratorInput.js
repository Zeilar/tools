import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
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
            margin: '0 1rem',
            flex: '10',
            '&::-webkit-slider-thumb': {
                border: '1px solid rgb(190, 190, 190)',
                'border-radius': '50%',
                background: 'white',
                appearance: 'none',
                height: '1.5rem',
                width: '1.5rem',
            },
        },
        inputsWrapper: {
            'justify-content': 'space-between',
            'flex-direction': 'row',
            'align-items': 'center',
            margin: '1rem 0',
            display: 'flex',
            height: '2rem',
        },
        resetButton: {
            border: '1px solid rgb(175, 175, 175)',
            'border-radius': '0.5rem',
            background: 'red',
            height: '2rem',
            width: '2rem',
            color: 'white',
        },
        resetButtonIcon: {
            
        },
        inputText: {
            width: '15%',
        },
    });
    const classes = styles();
    const input = useRef();

    function reset() {
        input.current.value = props.default;
        props.setter(props.default);
    }

    function inputScroll(e) {
        const value = parseInt(e.target.value);
        if (e.deltaY > 0) {
            if (value <= parseInt(e.target.getAttribute('min'))) return;
            e.target.value = value - 1;
            props.setter(value);
        } else {
            if (value >= parseInt(e.target.getAttribute('max'))) return;
            e.target.value = value + 1;
            props.setter(value);
        }
    }

    return (
        <div className={classes.inputsWrapper}>
            <span className={classes.inputText}>{props.text}</span>
            <input 
                className={classes.inputSlider} onChange={(e) => props.setter(e.target.value)} ref={input}
                type="range" min={props.min} max={props.max} defaultValue={props.default} onWheel={inputScroll}
            />
            <button className={classes.resetButton} onClick={reset}>
                <FontAwesomeIcon className={classes.resetButtonIcon} icon={faUndo} />
            </button>
        </div>
    );
}