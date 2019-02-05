import React from 'react';
import './index.css';

export default function Input(props) {
  return (
    <div class="input-group">
      <label htmlFor={props.id}>
        {props.label}
      </label>
      <span class="help-text">
        {props.helpText}
      </span>
      <input
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        type={props.type}
        required={props.required}
      />
    </div>
  );
}
