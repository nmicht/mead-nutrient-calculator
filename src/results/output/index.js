import React from 'react';
import './index.css';

export default function Output(props) {
  return (
    <div className="results-group">
      <label htmlFor={props.id}>
        {props.label}
        <span className="help-text">
        {props.helpText}
        </span>
      </label>
      <output name={props.id}>
        {props.value} {props.unit}
      </output>
    </div>
  );
}
