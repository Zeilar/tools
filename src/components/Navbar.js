import React, { useState, useRef, useEffect, useCallback } from 'react';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createUseStyles } from 'react-jss';
import { NavLink } from 'react-router-dom';
import Calculators from './Calculators';

export default function Navbar(props) {
    const styles = createUseStyles({
        navbar: {
            background: 'var(--secondary-color)',
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
            transition: 'color 0.15s ease-in-out, background 0.15s ease-in-out',
            color: 'var(--text-primary-color)',
            padding: '1rem 1.5rem',
            'user-select': 'none',
            'font-size': '2rem',
            background: 'none',
            margin: '0 1.5rem',
            '&:visited': {
                color: 'var(--text-primary-color)',
            },
            '&:hover': {
                color: 'dodgerblue',
            },
            '&.active': {
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
                background: 'rgb(235, 235, 235)',
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
        activeLine: {
            background: 'dodgerblue',
            position: 'absolute',
            height: '2px',
            left: '0',
            top: '0',
        },
    });
    const classes = styles();

    const [active, setActive] = useState(window.location.pathname);
    const [lineOffsetX, setLineOffsetX] = useState(0);
    const [lineOffsetY, setLineOffsetY] = useState(0);
    const [lineWidth, setLineWidth] = useState(0);
    const activeLine = useRef();
    const navbar = useRef();

    const setlineProperties = useCallback(() => {
        setLineOffsetY(Math.floor(navbar.current.getBoundingClientRect().height - activeLine.current.offsetHeight));
        document.querySelectorAll(`.${classes.navLink}`).forEach(element => {
            if (element.getAttribute('href') === active) {
                if (activeLine.current.style.transition === '') {
                    setTimeout(() => {
                        activeLine.current.style.transition = 'transform 0.25s ease-in-out, width 0.25s ease-in-out';
                    }, 5);
                }
                setLineOffsetX(element.getBoundingClientRect().left);
                setLineWidth(element.getBoundingClientRect().width);
            }
        });
    }, [active, classes.navLink, activeLine]);

    useEffect(() => {
        window.addEventListener('resize', setlineProperties);
        setlineProperties();
    }, [active, lineOffsetX, lineWidth, navbar, setlineProperties]);

    return (
        <nav className={classes.navbar} ref={navbar}>
            <ul className={classes.navList}>
                <div className={classes.activeLine} ref={activeLine} style={
                    { width: `${lineWidth}px`, transform: `translateX(${lineOffsetX}px)`, top: `${lineOffsetY}px` }
                }></div>
                <li className={classes.navItem}>
                    <NavLink to="/calculators" onClick={(e) => setActive(e.target.getAttribute('href'))} className={classes.navLink}>
                        Calculators
                    </NavLink>
                </li>
                <li className={classes.navItem}>
                    <NavLink to="/timer" onClick={(e) => setActive(e.target.getAttribute('href'))} className={classes.navLink}>
                        Timer
                    </NavLink>
                </li>
                <li className={classes.navItem}>
                    <NavLink to="/shadow-generator" onClick={(e) => setActive(e.target.getAttribute('href'))} className={classes.navLink}>
                        Shadow Generator
                    </NavLink>
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