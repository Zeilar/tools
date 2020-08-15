import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
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
            'flex-direction': 'row',
            'align-items': 'center',
            'margin-left': '3rem',
            background: 'white',
            display: 'flex',
            height: '60vh',
            width: '60vh',
        },
        shadowText: {
            color: 'black',
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
            'padding-top': '0.25rem',
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
    });
    const classes = styles();

    const [opacity, setOpacity] = useState(50);
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [inset, setInset] = useState(false);
    const [spread, setSpread] = useState(5);
    const [blur, setBlur] = useState(25);

    const boxShadow = `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${inset ? 'inset' : ''} rgba(0, 0, 0, ${opacity / 100})`;

    return (
        <div className={classes.shadowGenerator} id="content">
            <div className={classes.shadowInputs}>
                <Input text="Offset X" setter={setOffsetX} min="-25" max="25" default="0" />
                <Input text="Offset Y" setter={setOffsetY} min="-25" max="25" default="0" />
                <Input text="Blur" setter={setBlur} min="0" max="50" default="25" />
                <Input text="Spread" setter={setSpread} min="0" max="10" default="5" />
                <Input text="Opacity" setter={setOpacity} min="0" max="100" default="50" />
                <div className={classes.inputInsetWrapper}>
                    <span className={classes.inputInsetLabel} onClick={() => setInset(!inset)}>Inset</span>
                    <div className={`${classes.inputInset} ${inset ? 'checked' : ''}`} onClick={() => setInset(!inset)} id="inset">
                        {inset ? <FontAwesomeIcon className={classes.inputInsetCheck} icon={faCheck} /> : ''}
                    </div>
                </div>
            </div>
            <div className={classes.shadowContainer} style={{ boxShadow: boxShadow }}>
                <p className={classes.shadowText}>
                    {`box-shadow: ${boxShadow}`}
                </p>
            </div>
        </div>
    );
}