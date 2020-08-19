import useOnclickOutside from 'react-cool-onclickoutside';
import React, { useState, useRef } from 'react';
import { createUseStyles } from 'react-jss';
import Option from './Option';
import { useEffect } from 'react';

export default function Select(props) {
    const styles = createUseStyles({
        select: {
            '-webkit-box-shadow': '0 0 2px 0 rgba(0, 0, 0, 0.5)',
            '-moz-box-shadow': '0 0 2px 0 rgba(0, 0, 0, 0.5)',
            'box-shadow': '0 0 2px 0 rgba(0, 0, 0, 0.5)',
            padding: '0.5rem 0.75rem',
            'user-select': 'none',
            background: 'white',
            cursor: 'pointer',
            height: '2.5rem',
            color: 'black',
            '&.open': {
                background: 'rgb(245, 245, 245)',
            },
        },
        selectWrapper: {

        },
        options: {
            '-webkit-box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
            '-moz-box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
            'box-shadow': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
            transition: 'height 0.35s ease-in-out',
            'border-bottom-right-radius': '2px',
            'border-bottom-left-radius': '2px',
            background: 'white',
            overflow: 'hidden',
            cursor: 'pointer',
            height: '0',
        },
    });
    const classes = styles();

    const [selected, setSelected] = useState(localStorage.getItem('selectedOption') ?? props.children[0].props.value ?? '');
    const [open, setOpen] = useState(false);

    const options = [];
    let height = 0;
    props.children.forEach(option => {
        options.push(<Option setOpen={setOpen} setSelected={setSelected} key={option.props.value} value={option.props.value} />);
        height += 2.5;
    });

    const select = useOnclickOutside(() => {
        setOpen(false);
    });
    
    return (
        <div className={classes.selectWrapper} ref={select}>
            <div className={`${classes.select}${open ? ' open' : ''}`} onClick={() => setOpen(p => !p)}>
                {selected}
            </div>
            <div className={classes.options} style={{ height: open ? `${height}rem` : '0px' }}>
                {options}
            </div>
        </div>
    );
}