import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';

export default function Flexboxer() {
    const styles = createUseStyles({
        flexboxerContainer: {

        },
    });
    const classes = styles();

    return (
        <div className={classes.flexboxerContainer} id="content">
            
        </div>
    );
}