import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import React, { useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

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
        inputWrapper: {
            'justify-content': 'space-between',
            'flex-direction': 'row',
            'align-items': 'center',
            'position': 'relative',
            margin: '1.5rem 0',
            display: 'flex',
            height: '2rem',
        },
        resetButton: {
            'border-radius': '0.5rem',
            background: 'red',
            height: '2rem',
            color: 'white',
            width: '2rem',
        },
        resetButtonIcon: {
            transform: 'rotate(0deg)',
            '&.spin': {
                transition: 'transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
                transform: 'rotate(-360deg)',
            },
        },
        inputText: {
            width: '10%',
        },
        inputTextValue: {
            border: '1px solid rgb(50, 50, 50)',
            transform: 'translate(-50%, -50%)',
            background: 'rgb(15, 15, 15)',
            'border-radius': '0.5rem',
            'text-align': 'center',
            'user-select': 'none',
            position: 'absolute',
            padding: '0.5rem',
            width: '3.5rem',
            top: '-1.5rem',
            left: '50%',
        },
        resetButtonWrapper: {
            width: '10%',
        },
        inputTextWrapper: {
            width: '10%',
        },
    });
    const classes = styles();

    const [showInputValue, setShowInputValue] = useState();
    const resetButton = useRef();
    const resetIcon = useRef();
    const input = useRef();

    function reset(e) {
        input.current.value = props.default;
        const icon = resetIcon.current;
        icon.classList.add('spin');
        setTimeout(() => {
            icon.classList.remove('spin');
        }, 500);
        showInputBox(e);
    }

    function inputScroll(e) {
        const element = e.target;
        const value = parseInt(element.value);
        if (e.deltaY > 0) {
            if (value <= parseInt(element.getAttribute('min'))) return;
            element.value = value - 1;
            props.setter(value);
        } else {
            if (value >= parseInt(element.getAttribute('max'))) return;
            element.value = value + 1;
            props.setter(value);
        }
        showInputBox(e);
    }

    function showInputBox(e) {
        props.setter(e.target.value);
        if (!showInputValue) {
            setShowInputValue(true);
            setTimeout(() => {
                setShowInputValue(false);
            }, 2000);
        }
    }

    return (
        <div className={classes.inputWrapper}>
            <div className={classes.inputTextWrapper}>
                <span className={classes.inputText}>{props.text}</span>
            </div>
            {showInputValue ? <span className={classes.inputTextValue}>{input.current.value}</span> : ''}
            <input 
                className={classes.inputSlider} onChange={showInputBox} type="range" onWheel={inputScroll}
                min={props.min} max={props.max} defaultValue={props.default} ref={input}
            />
            <div className={classes.resetButtonWrapper}>
                <button className={classes.resetButton} onClick={reset} ref={resetButton}>
                    <FontAwesomeIcon className={classes.resetButtonIcon} icon={faUndo} forwardedRef={resetIcon} />
                </button>
            </div>
        </div>
    );
}