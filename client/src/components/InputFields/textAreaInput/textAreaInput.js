import React from 'react';
import './textAreaInput.css'

const TextAreaInput = (props) => {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <textarea style={{ height: '200px' }} type={props.type} name={props.name}
                defaultValue={props.defaultValue} placeholder={props.placeholder || props.label}
                onChange={props.onChange} {...props} className='form-control'/>
            </div>
    );
}

export default TextAreaInput;