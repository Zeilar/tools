import { createUseStyles } from 'react-jss';
import React from 'react';

export default function Navbar(props) {
    const styles = createUseStyles({
        navbar: {
            background: 'rgb(10, 10, 10)',
            'justify-content': 'center',
            'flex-direction': 'row',
            display: 'flex',
            padding: '1rem',
        },
        navList: {
            'flex-direction': 'row',
            display: 'flex',
        },
        navItem: {
        },
        navLink: {
            transition: 'color 0.15s ease-in-out, transform 0.15s ease-in-out, background 0.15s ease-in-out',
            padding: '1rem 1.5rem',
            'font-size': '2rem',
            background: 'none',
            color: 'white',
            '&:hover': {
                color: 'dodgerblue',
            },
            '&.active': {
                background: 'rgb(20, 20, 20)',
                transform: 'scale(1.05)',
                color: 'dodgerblue',
            },
        },
    });
    const classes = styles();

    function timerShow(e) {
        e.preventDefault();
        props.onTimerShow();
        activeButton(e);
    }

    function shadowGeneratorShow(e) {
        e.preventDefault();
        props.onShadowGeneratorShow();
        activeButton(e);
    }

    function activeButton(e) {
        const activeButton = document.querySelector(`.${classes.navLink}.active`);
        if (activeButton) activeButton.classList.remove('active');
        e.target.classList.add('active');
    }

    return (
        <nav className={classes.navbar}>
            <ul className={classes.navList}>
               <li className={classes.navItem}>
                    <a className={classes.navLink} onClick={timerShow}>Timer</a>
               </li>
               <li className={classes.navItem}>
                    <a className={classes.navLink} onClick={shadowGeneratorShow}>Shadow Generator</a>
               </li>
            </ul>
        </nav>
    );
}