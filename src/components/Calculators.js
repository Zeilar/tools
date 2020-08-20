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

    const squareRootInput = useRef();
    const percentInputA = useRef();
    const percentInputB = useRef();

    function calculatePercent(e) {
        e.preventDefault();
        const inputA = parseFloat(percentInputA.current.value);
        const inputB = parseFloat(percentInputB.current.value);
        const result = Math.round((inputA / inputB) * 100);
        if (isNaN(result)) return;
        alert(result);
    }

    function calculateSquareRoot(e) {
        e.preventDefault();
        const input = parseFloat(squareRootInput.current.value);
        const result = Math.round(Math.sqrt(input));
        if (isNaN(result)) return;
        alert(result);
    }

    return (
        <div className={classes.calculatorsContainer} id="content">
            <form className={classes.percentWrapper} onSubmit={calculatePercent}>
                <h1>What % is...</h1>
                <input className="noArrows" min="1" type="number" ref={percentInputA} />
                <span>of</span>
                <input className="noArrows" min="1" type="number" ref={percentInputB} />
                <button className="btnPrimary" type="submit">
                    <span>Go</span>
                </button>
            </form>
            <form className={classes.percentWrapper} onSubmit={calculateSquareRoot}>
                <h1>What is the square root of...</h1>
                <input className="noArrows" type="number" ref={squareRootInput} />
                <button className="btnPrimary" type="submit" min="1">
                    <span>Go</span>
                </button>
            </form>
        </div>
    );
}