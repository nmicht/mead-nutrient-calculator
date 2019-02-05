import React from 'react';
import Input from '../input/';
import Radio from '../radio/';
import Select from '../select/';
import './index.css';

export default class Form extends React.Component {
  handleChange(event) {
    console.log(event.target.value);
    // this.setState({value: event.target.value});
  }

  renderInput(item) {
    if (item.type === 'radio' || item.type === 'checkbox') {
      return (
        <Radio
          key={item.id}
          {...item}
          onChange={this.handleChange}
        />
      );
    } else if (item.type === 'select') {
      return (
        <Select
          key={item.id}
          {...item}
          onChange={this.handleChange}
        />
      );
    } else {
      return (
        <Input
          key={item.id}
          {...item}
          name={item.id}
          onChange={this.handleChange}
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
