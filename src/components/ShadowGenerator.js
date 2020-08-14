import React, { useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import Input from './ShadowGeneratorInput';

export default function ShadowGenerator() {
    const styles = createUseStyles({
        shadowGenerator: {
            'justify-content': 'center',
            'flex-direction': 'column',
            'align-items': 'center',
            display: 'flex',
        },
        shadowContainer: {
            'justify-content': 'center',
            'flex-direction': 'row',
            'align-items': 'center',
            background: 'white',
            display: 'flex',
            height: '35vh',
            width: '35vh',
        },
        shadowText: {
            color: 'black',
        },
        shadowInputs: {
            'flex-direction': 'column',
            'margin-top': '2rem',
            display: 'flex',
        },
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

    const [color, setColor] = useState('rgba(0, 0, 0, 0.75)');
    const [offsetX, setOffsetX] = useState(0);
    const [offsetY, setOffsetY] = useState(0);
    const [spread, setSpread] = useState(0);
    const [inset, setInset] = useState('');
    const [blur, setBlur] = useState(5);

    return (
        <div className={classes.shadowGenerator} id="content">
            <div className={classes.shadowContainer} style={{ boxShadow: `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${inset} ${color}` }}>
                <p className={classes.shadowText}>{`box-shadow: ${offsetX}px ${offsetY}px ${blur}px ${spread}px ${inset} ${color};`}</p>
            </div>
            <div className={classes.shadowInputs}>
                <Input setter={setOffsetX} min="-25" max="25" default="0" />
                <Input setter={setOffsetY} min="-25" max="25" default="0" />
                <Input setter={setBlur} min="0" max="50" default="25" />
                <Input setter={setSpread} min="0" max="10" default="5" />
            </div>
        </div>
    );
}