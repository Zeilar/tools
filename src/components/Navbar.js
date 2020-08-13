import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import React from 'react';

export default function Navbar(props) {
    const styles = createUseStyles({
        navbar: {
            background: 'rgb(10, 10, 10)',
            'justify-content': 'center',
            'flex-direction': 'row',
            position: 'relative',
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
            '&:visited': {
                color: 'white',
            },
            '&:hover': {
                color: 'dodgerblue',
            },
            '&.active': {
                background: 'rgb(20, 20, 20)',
                transform: 'scale(1.05)',
                color: 'dodgerblue',
            },
        },
        themeTogglerWrapper: {
            transform: 'translate(-50%, -50%)',
            position: 'absolute',
            right: '0',
            top: '50%',
        },
        themeToggler: {
            transition: 'background 0.15s ease-in-out',
            'justify-content': 'space-between',
            'align-items': 'center',
            'border-radius': '3rem',
            'user-select': 'none',
            position: 'relative',
            padding: '0.25rem',
            cursor: 'pointer',
            height: '1.5rem',
            display: 'flex',
            width: '3rem',
            '&.light': {
                background: 'white',
            },
            '&.dark': {
                background: 'rgb(20, 20, 20)',
            },
        },
        ball: {
            transition: 'right 0.15s ease-in-out, color 0.15s ease-in-out',
            position: 'absolute',
            '&.light': {
                right: '0.25rem',
                color: 'black',
            },
            '&.dark': {
                right: '1.5rem',
                color: 'white',
            },
        },
        checkbox: {
            display: 'none',
        },
    });
    const classes = styles();

    return (
        <nav className={classes.navbar}>
            <ul className={classes.navList}>
               <li className={classes.navItem}>
                    <NavLink to="/timer" className={classes.navLink} href="/timer">Timer</NavLink>
               </li>
               <li className={classes.navItem}>
                    <NavLink to="/shadow-generator" className={classes.navLink} href="/shadow-generator">Shadow Generator</NavLink>
               </li>
            </ul>
            <div className={classes.themeTogglerWrapper}>
                <input className={classes.checkbox} type="checkbox" id="themeToggler" onChange={props.toggleTheme} />
                <label className={`${classes.themeToggler} ${props.theme}`} htmlFor="themeToggler">
                    <FontAwesomeIcon 
                        className={`${props.theme === 'dark' ? 'dark' : 'light'} ${classes.ball}`}
                        icon={props.theme === 'dark' ? faMoon : faSun} 
                    />
                </label>
            </div>
        </nav>
    );
}