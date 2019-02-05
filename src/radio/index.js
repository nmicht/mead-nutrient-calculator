import React from 'react';
import Input from '../input/';
import './index.css';

export default function Radio(props) {
  const inputs = props.options.map((input) => {
    return (
      <Input
        key={props.id + input.value}
        id={props.id + input.value}
        name={props.id}
        type={props.type}
        defaultChecked={props.value === input.value}
        onChange={props.onChange}
        required={props.required}
        placeholder={props.placeholder}
        value={input.value}
        label={input.text}
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
