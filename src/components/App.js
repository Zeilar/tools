import { BrowserRouter as Router, Route } from 'react-router-dom';
import ShadowGenerator from './ShadowGenerator/ShadowGenerator';
import Flexboxer from './Flexboxer/Flexboxer';
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Timer from './Timer';

export default function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'dark');

    function toggleTheme(e) {
        if (theme === 'light') {
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
        } else {
            localStorage.setItem('theme', 'light');
            setTheme('light');
        }
    }

    return (
        <Router>
            <div id="wrapper" data-theme={theme}>
                <Navbar toggleTheme={toggleTheme} theme={theme} />
                <Route path="/timer" component={Timer} />
                <Route path="/shadow-generator" component={ShadowGenerator} />
                <Route path="/flexboxer" component={Flexboxer} />
                <Footer />
            </div>
        </Router>
    );
}