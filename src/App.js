import ShadowGenerator from './ShadowGenerator'
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Timer from './Timer';

export default function App() {
    const [shadowGeneratorVisible, setShadowGeneratorState] = useState(false);
    const [timerVisible, setTimerState] = useState(false);

    function onTimerShow() {
        setShadowGeneratorState(false);
        setTimerState(true);
    }

    function onShadowGeneratorShow() {
        setTimerState(false);
        setShadowGeneratorState(true);
    }

    return (
        <>
            <Navbar
                onShadowGeneratorShow={onShadowGeneratorShow}
                onTimerShow={onTimerShow}
            />
            {timerVisible ? <Timer /> : ''}
            {shadowGeneratorVisible ? <ShadowGenerator /> : ''}
            <Footer />
        </>
    );
}