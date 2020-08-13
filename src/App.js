import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./Themes";
import ShadowGenerator from './ShadowGenerator';
import { GlobalStyles } from "./GlobalStyles";
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Timer from './Timer';

export default function App() {
    const [shadowGeneratorVisible, setShadowGeneratorState] = useState(false);
    const [timerVisible, setTimerState] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'dark');

    function toggleTheme(e) {
        if (theme === 'light') {
            localStorage.setItem('theme', 'dark');
            e.target.classList.remove('light');
            e.target.classList.add('dark');
            setTheme('dark');
        } else {
            localStorage.setItem('theme', 'light');
            e.target.classList.remove('dark');
            e.target.classList.add('light');
            setTheme('light');
        }
    }

    function onTimerShow() {
        setShadowGeneratorState(false);
        setTimerState(true);
    }

    function onShadowGeneratorShow() {
        setTimerState(false);
        setShadowGeneratorState(true);
    }

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            <Navbar
                onShadowGeneratorShow={onShadowGeneratorShow}
                onTimerShow={onTimerShow}
                toggleTheme={toggleTheme}
                theme={theme}
            />
            {timerVisible ? <Timer /> : ''}
            {shadowGeneratorVisible ? <ShadowGenerator /> : ''}
            <Footer />
        </ThemeProvider>
    );
}