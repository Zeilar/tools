import { createUseStyles } from 'react-jss';
import React from 'react';

export default function Footer() {
    const styles = createUseStyles({
        footer: {
            background: 'var(--secondary-color)',
            'margin-top': 'auto',
            padding: '2rem',
        },
        footerText: {
            'text-align': 'center',
            color: 'var(--text-color)',
        }
    });
    const classes = styles();

    return (
        <footer className={classes.footer}>
            <p className={classes.footerText}>© 2020 Philip Angelin. All rights reserved.</p>
        </footer>
    );
}