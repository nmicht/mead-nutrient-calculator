import React from 'react';
import Input from '../input/';
import './index.css';

export default function Radio(props) {
  const inputs = props.options.map((input) => {
    return (
      <Input
        label={input.text}
        key={props.id + input.value}
        id={props.id + input.value}
        name={props.id}
        defaultChecked={input.value}
        type={props.type}
        onChange={props.onChange}
      />
    )
  });

  return (
    <div className="input-radio-group">
      <fieldset>
        <legend>{props.label}</legend>
        <span className="help-text">
        {props.helpText}
        </span>
        {inputs}
      </fieldset>
    </div>
  );
}
