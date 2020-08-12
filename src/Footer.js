import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';

export default function Footer() {
    const styles = createUseStyles({
        footer: {
            'margin-top': 'auto',
            background: 'white',
            padding: '2%',
        },
        footerText: {
            'text-align': 'center',
        }
    });
    const classes = styles();

    return (
        <footer className={classes.footer}>
            <p className={classes.footerText}>© 2020 Philip Angelin. All rights reserved.</p>
        </footer>
    );
}