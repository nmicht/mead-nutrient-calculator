import React from 'react';
import './index.css';

export default function Range(props) {
  return (
    <div className="range-group">
      <label htmlFor={props.id}>
        {props.label}
      </label>
      <span className="help-text">
      {props.helpText}
      </span>
      <div>
        <span className="label-min">
          {props.min}
        </span>
        <input
          className={'count' + props.max}
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
        <span className="label-min">
          {props.max}
        </span>
      </div>
    </div>
  );
}
