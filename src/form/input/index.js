import React from 'react';
import './index.css';

export default function Input(props) {
  return (
    <div className="input-group">
      <label htmlFor={props.id}>
        {props.label}
      </label>
      <span className="help-text">
      {props.helpText}
      </span>
      <input
        id={props.id}
        name={props.name}
        value={props.value}
        defaultChecked={props.defaultChecked}
        placeholder={props.placeholder}
        type={props.type}
        required={props.required ? 'required' : ''}
        onChange={(e) => props.onChange(e)}
        max={props.max}
        min={props.min}
        step={props.step}
      />
    </div>
  );
}
