import { createUseStyles } from 'react-jss';
import React from 'react';

export default function Navbar(props) {
    const styles = createUseStyles({
        navbar: {
            'justify-content': 'center',
            'flex-direction': 'row',
            background: 'white',
            padding: '10vh 0',
            display: 'flex',
        },
        navList: {
            'flex-direction': 'row',
            display: 'flex',
        },
        navItem: {
            margin: '0 1rem',
        },
        navLink: {
            transition: 'color 0.15s ease-in-out, border-color 0.15s ease-in-out, transform 0.15s ease-in-out',
            'border-bottom': '2px solid transparent',
            'user-select': 'none',
            'font-size': '2rem',
            background: 'none',
            padding: '1rem',
            '&:hover': {
                color: 'dodgerblue',
            },
            '&.active': {
                'border-color': 'dodgerblue',
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
                    <a className={classes.navLink} onClick={timerShow} href="#">Timer</a>
               </li>
               <li className={classes.navItem}>
                    <a className={classes.navLink} onClick={shadowGeneratorShow} href="#">Shadow Generator</a>
               </li>
            </ul>
        </nav>
    );
}