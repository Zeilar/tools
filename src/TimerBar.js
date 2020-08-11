import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';

export default function TimerBar({ width, timer }) {
    const styles = createUseStyles({
        timerBarOuter: {
            'flex-direction': 'column',
            'align-items': 'center',
            display: 'flex',
            width: '50vw',
        },
        timerBarInner: {
            border: '2px solid white',
            height: '2.5vh',
            width: '100%',
        },
        timerBar: {
            transition: 'width 1s linear',
            background: 'rgb(0 179 101)',
            height: '100%',
            width: '100%',
        },
        timerClock: {
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