import React from 'react';
import ErrorMsg from '../../ErrorMsg/ErrorMsg';

const createOptions = (values) => {
    let items = [];         
     for (let option of values) {             
          items.push(<option key={option.value} value={option.value}>{option.title || option.value}</option>);  
     }
     return items;
}

const SelectInput = (props) => {
    const OnErrorClass = ['form-control', 'InputError'].join(' ');
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <select name={props.name}
                defaultValue={props.defaultValue} placeholder={props.placeholder || props.label}
                className={props.errors[props.name] ? OnErrorClass : 'form-control'}
                onChange={props.onChange} {...props} >
                {createOptions(props.values)}
            </select>
            {props.errors[props.name] !== '' && <ErrorMsg msg={props.errors[props.name]} />}
        </div>
    );
}



export default SelectInput;