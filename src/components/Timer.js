import React, { useState, useEffect, useRef } from 'react';
import { createUseStyles } from 'react-jss';

export default function Timer() {
    const audio = new Audio('alarm.mp3');
    audio.volume = 0.25;
    const styles = createUseStyles({
        startTimer: {
            'margin-left': '1rem',
        },
        timerInputWrapper: {
            
        },
        timerInput: {
            '-moz-appearance': 'textfield',
            'text-align': 'center',
            'font-size': '10rem',
            background: 'none',
            color: 'inherit',
            width: '12rem',
            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
                appearance: 'none',
            },
        },
        timerInputSeparator: {
            'user-select': 'none',
            'font-size': '10rem',
        },
        timerContainer: {
            margin: '0 auto',
        },
        buttonsWrapper: {
            'justify-content': 'center',
            'margin-top': '1.5rem',
            display: 'flex',
        },
        buttons: {
            'box-shadow': '0 0 5px 0 rgba(0, 0, 0, 1)',
            background: 'dodgerblue',
            'border-radius': '50%',
            'font-size': '1.25rem',
            margin: '0 0.5rem',
            height: '5rem',
            color: 'white',
            width: '5rem',
        },
        resetTimer: {
            background: 'red',
        },
        timerBarOuter: {
            'box-shadow': '0 0 5px 0 rgba(0, 0, 0, 1)',
        },
        timerBarInner: {
            border: '1px solid black',
            height: '2.5vh',
        },
        timerBar: {
            transition: 'width 1s linear',
            background: 'dodgerblue',
            height: '100%',
        },
    });
    const classes = styles();

    const [timerResettable, setTimerResettable] = useState(false);
    const [timerPlayable, setTimerPlayable] = useState(false);
    const [originalInput, setOriginalInput] = useState(0);
    const [timerActive, setTimerState] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [barWidth, setBarWidth] = useState(100);
    const inputSeconds = useRef();
    const inputMinutes = useRef();
    const resetButton = useRef();
    const inputHours = useRef();

    useEffect(() => {
        if (barWidth <= 0) setBarWidth(0); 

        if (timerActive) {            
            inputSeconds.current.value = formatNumber(Math.floor(timerFormat().seconds));
            inputMinutes.current.value = formatNumber(Math.floor(timerFormat().minutes));
            inputHours.current.value = formatNumber(Math.round(timerFormat().hours));

            const timerTick = setTimeout(() => {       
                setTimerSeconds(timerSeconds - 1);
                barWidth - (100 / originalInput) > 0 ? setBarWidth((barWidth - (100 / originalInput))) : setBarWidth(0);
            }, 1000);

            if (timerSeconds <= 0) {
                clearTimeout(timerTick);
                setTimerState(false);
                setTimeout(() => {
                    audio.play();
                    setTimerResettable(false);
                    setOriginalInput(0);
                    setBarWidth(100);
                }, 1000);
                setTimeout(() => {
                    audio.pause();
                    audio.currentTime = 0;
                }, 5000);
            }

            return () => {
                clearTimeout(timerTick);
            }
        }
    }, [timerSeconds, timerActive, barWidth, inputSeconds, inputMinutes, inputHours]);

    function timerStart() {
        const secondsInput = inputSeconds.current;
        const minutesInput = inputMinutes.current;
        const hoursInput = inputHours.current;

        let seconds = parseInt(secondsInput.value);
        let minutes = parseInt(minutesInput.value);
        let hours = parseInt(hoursInput.value);

        if (!seconds || isNaN(seconds)) seconds = 0;
        if (!minutes || isNaN(minutes)) minutes = 0;
        if (!hours || isNaN(hours)) hours = 0;

        secondsInput.value = formatNumber(seconds);
        minutesInput.value = formatNumber(minutes);
        hoursInput.value = formatNumber(hours);

        const totalSeconds = seconds + (minutes * 60) + (hours * 60 * 60);
        
        if (totalSeconds <= 0) return setTimerState(false);

        audio.pause();
        audio.currentTime = 0;

        localStorage.setItem('timerSeconds', seconds);
        localStorage.setItem('timerMinutes', minutes);
        localStorage.setItem('timerHours', hours);

        setOriginalInput(totalSeconds);
        setTimerSeconds(totalSeconds);
        setTimerResettable(true);
        setTimerState(true);  
    }

    function timerFormat() {
        let seconds = 0;
        let minutes = 0;
        let hours = 0;

        if (timerSeconds > 0) {
            seconds = timerSeconds;
            minutes = seconds / 60;
            hours = 0;

            if (timerSeconds > 60 * 60) hours = (minutes / 60) % 60;

            minutes = minutes % 60;
            seconds = seconds % 60;
            
            if (timerSeconds > 60 * 60) {
                hours -= minutes / 60;
                hours -= seconds / 60 / 60;
            }
        }
        return {
            seconds: seconds,
            minutes: minutes,
            hours: hours,
        };
    }

    function formatInput(e) {
        const value = parseInt(e.target.value);
        if (isNaN(value)) return e.target.value = '00';
        if (value < 10) e.target.value = `0${value}`;
    }

    function inputChange(e) {
        formatInput(e);
    }

    function timerReset() {
        audio.pause();
        audio.currentTime = 0;
        setTimerResettable(false);
        setTimerState(false);
        setOriginalInput(0);
        setTimerSeconds(0);
        setBarWidth(100);
    }

    function formatNumber(number) {
        if (isNaN(number)) return '00';
        return number < 10 ? `0${number}` : number;
    }

    function inputScroll(e) {
        const value = parseInt(e.target.value);
        if (isNaN(value)) return;
        if (e.deltaY > 0) {
            if (value <= parseInt(e.target.getAttribute('min'))) return;
            e.target.value = formatNumber(value - 1);
        } else {
            if (value >= parseInt(e.target.getAttribute('max'))) return;
            e.target.value = formatNumber(value + 1);
        }
    }

    return (
        <div className={classes.timerContainer} id="content">
            <div className={classes.timerInputWrapper}>
                <input 
                    className={classes.timerInput} min="0" max="59" type="number" onBlur={inputChange} ref={inputHours} autoComplete="off" title="Timer hours"
                    onClick={(e) => e.target.select()} defaultValue={formatNumber(localStorage.getItem('timerHours')) ?? '00'} onWheel={inputScroll}
                />
                <span className={classes.timerInputSeparator}>:</span>
                <input 
                    className={classes.timerInput} min="0" max="59" type="number" onBlur={inputChange} ref={inputMinutes} autoComplete="off" title="Timer minutes"
                    onClick={(e) => e.target.select()} defaultValue={formatNumber(localStorage.getItem('timerMinutes')) ?? '00'} onWheel={inputScroll}
                />
                <span className={classes.timerInputSeparator}>:</span>
                <input 
                    className={classes.timerInput} min="0" max="59" type="number" onBlur={inputChange} ref={inputSeconds} autoComplete="off" title="Timer seconds"
                    onClick={(e) => e.target.select()} defaultValue={formatNumber(localStorage.getItem('timerSeconds')) ?? '00'} onWheel={inputScroll}
                />
            </div>
            <div className={classes.timerBarOuter}>
                <div className={classes.timerBarInner}>
                    <div className={classes.timerBar} style={{ width: `${barWidth}%` }}></div>
                </div>
            </div>
            <div className={classes.buttonsWrapper}>
                { 
                    !timerActive
                        ? <button className={`${classes.buttons} ${classes.startTimer}`} onClick={timerStart} title="Start timer">
                            <span>Start</span>
                        </button>
                        : <button className={`${classes.buttons} ${classes.pauseTimer}`} onClick={() => setTimerState(false)} title="Pause timer">
                            <span>Pause</span>
                        </button>
                }
                <button className={`${classes.buttons} ${classes.resetTimer}`} onClick={timerReset} ref={resetButton} disabled={!timerResettable} title="Reset timer">
                    <span>Reset</span>
                </button>
            </div>
        </div>
    );
}