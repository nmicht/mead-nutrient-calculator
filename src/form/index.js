import React from 'react';
import Input from './input/';
import Radio from './radio/';
import Select from './select/';
import './index.css';

export default class Form extends React.Component {

  renderInput(item) {
    if (item.type === 'radio' || item.type === 'checkbox') {
      return (
        <Radio
          key={item.id}
          {...item}
          onChange={(e) => item.onChange(e)}
        />
      );
    } else if (item.type === 'select') {
      return (
        <Select
          key={item.id}
          {...item}
          onChange={(e) => item.onChange(e)}
        />
      );
    } else {
      return (
        <Input
          key={item.id}
          {...item}
          name={item.id}
          onChange={(e) => item.onChange(e)}
        />
      );
    }
  }

  render() {
    const inputs = this.props.items.map(item => this.renderInput(item));

    return (
      <div>
        <form>
          {inputs}
          <button>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
