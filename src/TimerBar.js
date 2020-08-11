import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';

export default function TimerBar({ width, timer }) {
    const styles = createUseStyles({
        timerBarOuter: {
            'flex-direction': 'column',
            'align-items': 'center',
            width: 'fit-content',
            display: 'flex',
        },
        timerBarInner: {
            border: '2px solid white',
            height: '2.5vh',
            width: '100%',
        },
        timerBar: {
            transition: 'width 1s linear',
            background: 'dodgerblue',
            height: '100%',
            width: '100%',
        },
        timerClock: {
            'font-family': 'Helvetica',
            'font-size': '10rem',
        }
    });
    const classes = styles();

    return (
        <div className={classes.timerBarOuter}>
            <p className={classes.timerClock}>{timer}</p>
            <div className={classes.timerBarInner}>
                <div className={classes.timerBar} style={{ width: `${width}%` }}></div>
            </div>
        </div>
    );
}