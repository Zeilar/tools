import React, { useState, useRef, useEffect } from 'react';
import Select from './PseudoElements/Select';
import Option from './PseudoElements/Option';
import { createUseStyles } from 'react-jss';

export default function Expressions() {
    const styles = createUseStyles({
        expressionsContainer: {
            'justify-content': 'center',
            display: 'flex',
        },
    });
    const classes = styles();

    const [selected, setSelected] = useState(localStorage.getItem('selectedOption') ?? '');
    const selectorContainer = useRef();
    const operatorSelector = useRef();
    const errorMessage = useRef();
    const codeInput = useRef();

    function runCode(e) {
        e.preventDefault();
        const input = codeInput.current;
        errorMessage.current.textContent = '';
        try {
            eval(input.value);
        } catch (e) {
            errorMessage.current.textContent = e;
        }
    }

    useEffect(() => {
        
    });

    return (
        <div className={classes.expressionsContainer} id="content">
            <form onSubmit={runCode}>
                <textarea autoComplete="off" ref={codeInput}></textarea>
                <Select selected={selected} setSelected={setSelected} forwardRef={selectorContainer}>
                    <Option value="==" />
                    <Option value="===" />
                    <Option value="!=" />
                    <Option value="!==" />
                    <Option value="<" />
                    <Option value=">" />
                    <Option value="<=" />
                    <Option value=">=" />
                </Select>
                {/* <button type="submit">Go</button> */}
            </form>
            <p ref={errorMessage} className={classes.errorMessage}></p>
        </div>
    );
}