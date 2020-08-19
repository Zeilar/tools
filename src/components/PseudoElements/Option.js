import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';

export default function Option(props) {
    const styles = createUseStyles({
        option: {
            transition: 'background 0.15s linear',
            padding: '0.5rem 0.75rem',
            'user-select': 'none',
            height: '2.5rem',
            '&:hover': {
                background: 'rgb(245, 245, 245)',
            },
        },
        optionText: {
            color: 'black',
        },
    });
    const classes = styles();

    function select() {
        localStorage.setItem('selectedOption', props.value);
        props.setSelected(props.value);
        props.setOpen(false);
    }

    return (
        <div className={classes.option} onClick={select}>
            <span className={classes.optionText}>{props.value}</span>
        </div>
    );
}