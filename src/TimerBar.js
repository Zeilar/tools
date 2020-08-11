import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';

export default function TimerBar({ width }) {
    const styles = createUseStyles({
        timerBarOuter: {
            height: '2rem',
            width: '10rem',
        },
        timerBarInner: {
            transition: 'width 1s linear',
            background: 'green',
            height: '100%',
            width: '100%',
        },
        timerText: {

        }
    });
    const classes = styles();

    return (
        <div className={classes.timerBarOuter}>
            <div className={classes.timerBarInner} style={{ width: `${width}%` }}>
            </div>
        </div>
    );
}