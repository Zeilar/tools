import React, { useState, useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import TimerBar from './TimerBar';

export default function Timer() {
    const audio = new Audio('alarm.mp3');
    const styles = createUseStyles({
        startTimer: {
            'margin-left': '1rem',
        },
        timerInputWrapper: {

        },
        timerInput: {
            border: '1px solid black',
            margin: '0 0.25rem',
        },
        timerContainer: {
            'flex-direction': 'column',
            'align-items': 'center',
            display: 'flex',
        },
        buttons: {

        },
    });
    const classes = styles();

    const [timerSeconds, setTimerSeconds] = useState(localStorage.getItem('timer-seconds') ?? 0);
    const [timerMinutes, setTimerMinutes] = useState(localStorage.getItem('timer-minutes') ?? 0);
    const [timerHours, setTimerHours] = useState(localStorage.getItem('timer-hours') ?? 0);
    const [timerActive, setTimerState] = useState(false);
    const [timerInput, setTimerInput] = useState(false);
    const [barWidth, setsBarWidth] = useState(100);

    useEffect(() => {
        if (timerActive && timerInput > 0) {
            const timerTick = setTimeout(() => {
                if (timerSeconds <= 0 && timerMinutes > 0) {
                    setTimerSeconds(59);
                    setTimerMinutes(timerMinutes - 1);
                }
                if (timerSeconds <= 0 && timerMinutes < 0 && timerHours > 0) {
                    setTimerMinutes(59);
                    setTimerHours(timerHours - 1)
                }
                if (timerSeconds > 0) setTimerSeconds(timerSeconds - 1);

                setsBarWidth(barWidth - (100 / timerInput));
            }, 1000);
            if (Math.round(barWidth) <= 0) {
                clearTimeout(timerTick);
                document.querySelector('#inputSeconds').value = '00';
                document.querySelector('#inputMinutes').value = '00';
                document.querySelector('#inputHours').value = '00';
                setTimerInput(false);
                setTimerSeconds(0);
                setTimerMinutes(0);
                setTimerHours(0);
                setsBarWidth(0);

                setTimeout(() => {
                    setTimerState(false);
                    audio.volume = 0.25;
                    audio.play();
                    setTimeout(() => {
                        audio.pause();
                        audio.currentTime = 0;
                    }, 5000);
                }, 1000);
            }
            return () => {
                clearTimeout(timerTick);
            }
        }
    }, [timerSeconds, timerMinutes, timerHours, timerInput, timerActive, barWidth]);

    function timerStart() {
        const secondsInput = document.querySelector('#inputSeconds');
        const minutesInput = document.querySelector('#inputMinutes');
        const hoursInput = document.querySelector('#inputHours');
        let seconds = parseInt(secondsInput.value);
        let minutes = parseInt(minutesInput.value);
        let hours = parseInt(hoursInput.value);

        if (!seconds) seconds = 0;
        secondsInput.value = formatNumber(seconds);

        if (!minutes) minutes = 0;
        minutesInput.value = formatNumber(minutes);

        if (!hours) hours = 0;
        hoursInput.value = formatNumber(hours);

        const input = seconds + (minutes * 60) + (hours * 60 * 60);
        
        if (timerSeconds !== input) setsBarWidth(100);
        if (input <= 0) return setTimerState(false);

        setTimerSeconds(seconds);
        setTimerMinutes(minutes);
        setTimerHours(hours);
        setTimerInput(input);
        setTimerState(true);  
    }

    function formatInput(e) {
        const value = parseInt(e.target.value);
        if (value < 10) e.target.value = `0${value}`;
    }

    function inputChange(e) {
        setTimerState(false);
        formatInput(e);
    }

    function timerReset() {
        document.querySelector('#inputSeconds').value = '00';
        document.querySelector('#inputMinutes').value = '00';
        document.querySelector('#inputHours').value = '00';
        setTimerInput(false);
        setTimerState(false);
        setTimerSeconds(0);
        setTimerMinutes(0);
        setsBarWidth(100);
        setTimerHours(0);
    }

    function formatNumber(number) {
        return number < 10 ? `0${number}` : number;
    }

    return (
        <div className={classes.timerContainer}>
            <div className={classes.timerInputWrapper}>
                <input className={classes.timerInput} id="inputHours" onChange={inputChange} type="number" min="0" max="59" defaultValue="00" />
                <input className={classes.timerInput} id="inputMinutes" onChange={inputChange} type="number" min="0" max="59" defaultValue="00" />
                <input className={classes.timerInput} id="inputSeconds" onChange={inputChange} type="number" min="0" max="59" defaultValue="00" />
            </div>
            <TimerBar width={barWidth} timer={`${formatNumber(timerHours)}:${formatNumber(timerMinutes)}:${formatNumber(timerSeconds)}`} />
            <div className={classes.buttons}>
                { 
                    !timerActive
                        ? <button className={classes.startTimer} onClick={timerStart} type="button">Start</button>
                        : <button className={classes.startTimer} onClick={() => setTimerState(false)} type="button">Pause</button>
                }
                <button className={classes.startTimer} onClick={timerReset} type="button">Reset</button>
            </div>
        </div>
    );
}