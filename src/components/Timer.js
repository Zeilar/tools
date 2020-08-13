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
            'justify-content': 'space-between',
            display: 'flex',
            width: '100%',
        },
        timerInput: {
            border: '1px solid black',
            'text-align': 'center',
            'font-size': '5rem',
            height: '8rem',
            'border-radius': '1rem',
            width: '8rem',
        },
        timerContainer: {
            'flex-direction': 'column',
            'align-items': 'center',
            margin: '0 auto',
            display: 'flex',
        },
        buttonsWrapper: {
            'justify-content': 'center',
            'flex-direction': 'row',
            'margin-top': '2rem',
            display: 'flex',
        },
        buttons: {
            background: 'dodgerblue',
            'border-radius': '50%',
            'font-size': '1.25rem',
            margin: '0 0.5rem',
            height: '5rem',
            color: 'white',
            width: '5rem',
        },
        startTimer: {
            
        },
        pauseTimer: {
            
        },
        resetTimer: {
            background: 'red',
        },
        timerBarOuter: {
            'flex-direction': 'column',
            'align-items': 'center',
            width: 'fit-content',
            display: 'flex',
            width: '100%',
        },
        timerBarInner: {
            border: '1px solid black',
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
            margin: '1% 0',
        },
    });
    const classes = styles();

    const [originalInput, setOriginalInput] = useState(0);
    const [timerActive, setTimerState] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [barWidth, setBarWidth] = useState(100);
    const inputSeconds = useRef();
    const inputMinutes = useRef();
    const inputHours = useRef();

    useEffect(() => {
        if (barWidth <= 0) setBarWidth(0); 

        inputSeconds.current.value = formatNumber(Math.floor(timerFormat().seconds));
        inputMinutes.current.value = formatNumber(Math.floor(timerFormat().minutes));
        inputHours.current.value = formatNumber(Math.round(timerFormat().hours));

        if (timerActive) {            
            const timerTick = setTimeout(() => {       
                setTimerSeconds(timerSeconds - 1);
                setBarWidth(barWidth - (100 / originalInput));
            }, 1000);

            if (timerSeconds <= 0) {
                clearTimeout(timerTick);
                audio.play();
                setTimeout(() => {
                    audio.pause();
                    audio.currentTime = 0;
                }, 5000);
                setOriginalInput(0);
                setTimerState(false);
            }
        }
    }, [timerSeconds, timerActive, barWidth]);

    function timerStart() {
        const secondsInput = inputSeconds.current;
        const minutesInput = inputMinutes.current;
        const hoursInput = inputHours.current;

        let seconds = parseInt(secondsInput.value);
        let minutes = parseInt(minutesInput.value);
        let hours = parseInt(hoursInput.value);

        if (!seconds) seconds = 0;
        if (!minutes) minutes = 0;
        if (!hours) hours = 0;

        secondsInput.value = formatNumber(seconds);
        minutesInput.value = formatNumber(minutes);
        hoursInput.value = formatNumber(hours);

        const totalSeconds = seconds + (minutes * 60) + (hours * 60 * 60);
        
        if (totalSeconds <= 0) return setTimerState(false);

        localStorage.setItem('timerSeconds', seconds);
        localStorage.setItem('timerMinutes', minutes);
        localStorage.setItem('timerHours', hours);

        setOriginalInput(totalSeconds);
        setTimerSeconds(totalSeconds);
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
        if (value < 10) e.target.value = `0${value}`;
    }

    function inputChange(e) {
        formatInput(e);
    }

    function timerReset() {
        audio.pause();
        audio.currentTime = 0;
        setTimerState(false);
        setOriginalInput(0);
        setTimerSeconds(0);
        setBarWidth(100);
    }

    function timerPause() {
        setTimerState(false);
    }

    function formatNumber(number) {
        return number < 10 ? `0${number}` : number;
    }

    return (
        <div className={classes.timerContainer} id="content">
            <div className={classes.timerInputWrapper}>
                <input 
                    className={classes.timerInput} maxLength="2" id="inputHours" type="text" onBlur={inputChange} ref={inputHours}
                    onClick={(e) => e.target.select()} defaultValue={formatNumber(localStorage.getItem('timerHours')) ?? '00'}
                />
                <input 
                    className={classes.timerInput} maxLength="2" id="inputMinutes" type="text" onBlur={inputChange} ref={inputMinutes}
                    onClick={(e) => e.target.select()} defaultValue={formatNumber(localStorage.getItem('timerMinutes')) ?? '00'} 
                />
                <input 
                    className={classes.timerInput} maxLength="2" id="inputSeconds" type="text" onBlur={inputChange} ref={inputSeconds}
                    onClick={(e) => e.target.select()} defaultValue={formatNumber(localStorage.getItem('timerSeconds')) ?? '00'}
                />
            </div>
            <div className={classes.timerBarOuter}>
                <p className={classes.timerClock}>{timerSeconds}</p>
                <div className={classes.timerBarInner}>
                    <div className={classes.timerBar} style={{ width: `${barWidth}%` }}></div>
                </div>
            </div>
            <div className={classes.buttonsWrapper}>
                { 
                    !timerActive
                        ? <button className={`${classes.buttons} ${classes.startTimer}`} onClick={timerStart}>
                            <span>Start</span>
                        </button>
                        : <button className={`${classes.buttons} ${classes.pauseTimer}`} onClick={timerPause}>
                            <span>Pause</span>
                        </button>
                }
                <button className={`${classes.buttons} ${classes.resetTimer}`} onClick={timerReset}>
                    <span>Reset</span>
                </button>
            </div>
        </div>
    );
}