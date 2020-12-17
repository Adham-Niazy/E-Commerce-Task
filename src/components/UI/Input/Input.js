import React from 'react';

import './Input.scss';

const Input = props => {




    let typeOfInput = null;
    const inputClasses = ['InputElement'];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid')
    }

    switch(props.elementType) {
        case('input'):
            typeOfInput = 
                    <input 
                        onChange={props.changed} 
                        className={inputClasses.join(' ')} 
                        {...props.elementConfig} 
                        value={props.value} />;
            break;
        default: 
            typeOfInput = 
                <input 
                    onChange={props.changed} 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} value={props.value}/>;
    }
    return (
        <div className={'Input'}>
            <label className={'Label'}>{props.label}</label>
            {typeOfInput}
        </div>
    )
} 
export default Input;