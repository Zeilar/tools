import { createUseStyles } from 'react-jss';
import React from 'react';

export default function Navbar(props) {
    const styles = createUseStyles({
        navbar: {
            'justify-content': 'center',
            'flex-direction': 'row',
            margin: '10vh 0',
            display: 'flex',
        },
        navList: {
            'flex-direction': 'row',
            display: 'flex',
        },
        navItem: {
            margin: '0 1rem',
        },
        navButton: {
            transition: 'color 0.15s ease-in-out, border-color 0.15s ease-in-out, transform 0.15s ease-in-out',
            'border-bottom': '2px solid transparent',
            'font-size': '2rem',
            background: 'none',
            padding: '1rem',
            color: 'white',
            '&.active': {
                'border-color': 'dodgerblue',
                transform: 'scale(1.05)',
                color: 'dodgerblue',
            },
        },
    });
    const classes = styles();

    function timerShow(e) {
        props.onTimerShow();
        activeButton(e);
    }

    function shadowGeneratorShow(e) {
        props.onShadowGeneratorShow();
        activeButton(e);
    }

    function activeButton(e) {
        const activeButton = document.querySelector(`.${classes.navButton}.active`);
        if (activeButton) activeButton.classList.remove('active');
        e.target.classList.add('active');
    }

    return (
        <nav className={classes.navbar}>
            <ul className={classes.navList}>
               <li className={classes.navItem}>
                    <button className={classes.navButton} onClick={timerShow} type="button">
                        Timer
                    </button>
               </li>
               <li className={classes.navItem}>
                    <button className={classes.navButton} onClick={shadowGeneratorShow} type="button">
                        Shadow Generator
                    </button>
               </li>
            </ul>
        </nav>
    );
}