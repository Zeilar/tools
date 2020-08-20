import React, { useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';

export default function Calculators() {
    const styles = createUseStyles({
        calculatorsContainer: {

        },
        percentWrapper: {

        },
    });
    const classes = styles();

    const percentInputA = useRef();
    const percentInputB = useRef();

    function calculatePercent(e) {
        e.preventDefault();
        const inputA = parseFloat(percentInputA.current.value);
        const inputB = parseFloat(percentInputB.current.value);
        if (inputA <= 0 || inputB <= 0) return;
        const result = (inputA) / parseFloat(inputB) * 100;
        alert(result);
    }

    return (
        <div className={classes.calculatorsContainer} id="content">
            <form className={classes.percentWrapper} onSubmit={calculatePercent}>
                <h1>What % is...</h1>
                <input min="1" type="number" ref={percentInputA} />
                <span>of</span>
                <input min="1" type="number" ref={percentInputB} />
                <button type="submit">
                    Go
                </button>
            </form>
        </div>
    );
}