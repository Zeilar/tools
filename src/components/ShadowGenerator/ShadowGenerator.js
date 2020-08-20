import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import Input from './ShadowGeneratorInput';

export default function ShadowGenerator() {
    const styles = createUseStyles({
        shadowGenerator: {
            'justify-content': 'center',
            'flex-direction': 'row',
            'align-items': 'center',
            'font-size': '1.35rem',
            display: 'flex',
        },
        shadowContainer: {
            'justify-content': 'center',
            'flex-direction': 'column',
            'align-items': 'center',
            'margin-left': '3rem',
            background: 'white',
            display: 'flex',
            height: '60vh',
            width: '60vh',
        },
        shadowText: {
            'text-align': 'center',
            'font-size': '1.5rem',
            background: 'none',
            margin: '0.5rem 0',
            color: 'black',
            width: '100%',
            border: '0',
        },
        shadowInputs: {
            'flex-direction': 'column',
            display: 'flex',
            width: '60vh',
        },
        inputInsetWrapper: {
            'justify-content': 'center',
            'flex-direction': 'row',
            'align-items': 'center',
            display: 'flex',
        },
        inputInset: {
            border: '1px solid rgb(175, 175, 175)',
            'justify-content': 'center',
            'border-radius': '0.25rem',
            'align-items': 'center',
            'user-select': 'none',
            cursor: 'pointer',
            height: '1.75rem',
            width: '1.75rem',
            display: 'flex',
            '&.checked': {
                'border-color': 'dodgerblue',
                background: 'dodgerblue',
            },
        },
        inputInsetLabel: {
            'padding-right': '0.5rem',
            'user-select': 'none',
            cursor: 'pointer',
        },
        inputInsetCheck: {
            margin: 'auto',
            color: 'white',
        },
        copyButton: {
            'font-size': '1.5rem',
            'margin-top': '2rem',
            '&.animate': {
                animation: 'buttonClickGrow 0.35s linear',
            },
        },
    });
    const classes = styles();

    const [opacity, setOpacity] = useState(50);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [inset, setInset] = useState(false);
    const [spread, setSpread] = useState(5);
    const [blur, setBlur] = useState(25);
    const copyButtonText = useRef();

    const boxShadow = inset
        ? `${offsetX}px ${offsetY}px ${blur}px ${spread}px inset rgba(0, 0, 0, ${opacity / 100})`
        : `${offsetX}px ${offsetY}px ${blur}px ${spread}px rgba(0, 0, 0, ${opacity / 100})`;

    function copy(e) {
        const button = e.target;
        copyButtonText.current.textContent = 'Copied';
        button.classList.add('animate');
        setTimeout(() => {
            button.classList.remove('animate');
        }, 350);
        setTimeout(() => {
            if (copyButtonText.current) copyButtonText.current.textContent = 'Copy';
        }, 2000);

        const element = document.createElement('textarea');
        element.value = `
            -webkit-box-shadow: ${boxShadow};
            -moz-box-shadow: ${boxShadow};
            box-shadow: ${boxShadow};
        `;
        document.body.appendChild(element);
        element.select();
        document.execCommand('copy');
        document.body.removeChild(element);
    }

    return (
        <div className={classes.shadowGenerator} id="content">
            <div className={classes.shadowInputs}>
                <Input inset={inset} text="Offset X" setter={setOffsetX} min="-25" max="25" default="0" />
                <Input inset={inset} text="Offset Y" setter={setOffsetY} min="-25" max="25" default="0" />
                <Input inset={inset} text="Blur" setter={setBlur} min="0" max="50" default="25" />
                <Input inset={inset} text="Spread" setter={setSpread} min="0" max="10" default="5" />
                <Input inset={inset} text="Opacity" setter={setOpacity} min="0" max="100" default="50" />
                <div className={classes.inputInsetWrapper}>
                    <span className={classes.inputInsetLabel} onClick={() => setInset(p => !p)}>Inset</span>
                    <div className={`${classes.inputInset} ${inset ? 'checked' : ''}`} onClick={() => setInset(p => !p)}>
                        {inset ? <FontAwesomeIcon className={classes.inputInsetCheck} icon={faCheck} /> : ''}
                    </div>
                </div>
            </div>
            <div className={classes.shadowContainer} style={{ boxShadow: boxShadow }}>
                <input readOnly className={classes.shadowText} onClick={(e) => e.target.select()} value={`-webkit-box-shadow: ${boxShadow};`} />
                <input readOnly className={classes.shadowText} onClick={(e) => e.target.select()} value={`-moz-box-shadow: ${boxShadow};`} />
                <input readOnly className={classes.shadowText} onClick={(e) => e.target.select()} value={`box-shadow: ${boxShadow};`} />
                <button className={`${classes.copyButton} btnPrimary`} onClick={copy}>
                    <span className={classes.copyButtonText} ref={copyButtonText}>Copy</span>
                </button>
            </div>
        </div>
    );
}