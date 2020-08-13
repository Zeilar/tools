import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';

export default function ShadowGenerator() {
    const styles = createUseStyles({
        shadowGenerator: {

        },
    });
    const classes = styles();

    return (
        <div className={classes.shadowGenerator} id="content">
            Shadow generator
        </div>
    );
}