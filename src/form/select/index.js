import React from 'react';
import './index.css';

export default function Select(props) {
  const options = props.options.map((option) => {
    return (
      <option
        key={props.id + option.text}
        value={option.value}
        onChange={(e) => props.onChange(e)}
      >
        {option.text}
      </option>
    );
  });

  return (
    <div className="select-group">
      <label htmlFor={props.id}>
        {props.label}
      </label>
      <span className="help-text">
      {props.helpText}
      </span>
      <select
        id={props.id}
        name={props.id}
        value={props.value}
        required={props.required}
        onChange={props.onChange}
      >
        {options}
      </select>
    </div>
  );
}
