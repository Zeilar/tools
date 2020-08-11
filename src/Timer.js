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
            display: 'flex',
            margin: 'auto',
            width: '31vw',
        },
        buttonsWrapper: {
            'justify-content': 'center',
            'flex-direction': 'row',
            'margin-top': '1rem',
            display: 'flex',
        },
        buttons: {
            'border-radius': '50%',
            'font-size': '1.25rem',
            margin: '0 0.5rem',
            height: '5rem',
            color: 'white',
            width: '5rem',
        },
        startTimer: {
            background: 'green',
        },
        pauseTimer: {
            background: 'yellow',
        },
        resetTimer: {
            background: 'red',
        },
    });
    const classes = styles();

    const [timerActive, setTimerState] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [timerMinutes, setTimerMinutes] = useState(0);
    const [timerInput, setTimerInput] = useState(false);
    const [timerHours, setTimerHours] = useState(0);
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
                timerReset(0);

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
        localStorage.setItem('timerSeconds', secondsInput.value);
        localStorage.setItem('timerMinutes', minutesInput.value);
        localStorage.setItem('timerHours', hoursInput.value);
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

    function timerReset(barWidth = 100) {
        document.querySelector('#inputSeconds').value = '00';
        document.querySelector('#inputMinutes').value = '00';
        document.querySelector('#inputHours').value = '00';
        setsBarWidth(barWidth);
        setTimerInput(false);
        setTimerState(false);
        setTimerSeconds(0);
        setTimerMinutes(0);
        setTimerHours(0);
    }

    function timerPause() {
        document.querySelector('#inputSeconds').value = formatNumber(timerSeconds);
        document.querySelector('#inputMinutes').value = formatNumber(timerMinutes);
        document.querySelector('#inputHours').value = formatNumber(timerHours);
        setTimerState(false);
    }

    function formatNumber(number) {
        return number < 10 ? `0${number}` : number;
    }

    return (
        <div className={classes.timerContainer}>
            <div className={classes.timerInputWrapper}>
                <input 
                    className={classes.timerInput} maxLength="2" id="inputHours" type="text" onBlur={inputChange}
                    onClick={(e) => e.target.select()} defaultValue={localStorage.getItem('timerHours') ?? '00'}
                />
                <input 
                    className={classes.timerInput} maxLength="2" id="inputMinutes" type="text" onBlur={inputChange}
                    onClick={(e) => e.target.select()} defaultValue={localStorage.getItem('timerMinutes') ?? '00'} 
                />
                <input 
                    className={classes.timerInput} maxLength="2" id="inputSeconds" type="text" onBlur={inputChange}
                    onClick={(e) => e.target.select()} defaultValue={localStorage.getItem('timerSeconds') ?? '00'}
                />
            </div>
            <TimerBar width={barWidth} timer={`${formatNumber(timerHours)}:${formatNumber(timerMinutes)}:${formatNumber(timerSeconds)}`} />
            <div className={classes.buttonsWrapper}>
                { 
                    !timerActive
                        ? <button className={`${classes.buttons} ${classes.startTimer}`} onClick={timerStart} type="button">Start</button>
                        : <button className={`${classes.buttons} ${classes.pauseTimer}`} onClick={timerPause} type="button">Pause</button>
                }
                <button className={`${classes.buttons} ${classes.resetTimer}`} onClick={() => timerReset()} type="button">Reset</button>
            </div>
        </div>
    );
}