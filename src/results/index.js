import React from 'react';
import Output from './output/';
import './index.css';

export default class Results extends React.Component {

  renderOutput(item, value) {
    return (
      <Output
        key={item.id}
        {...item}
        value={value}
      />
    );
  }

  render() {
    const outputs = this.props.fields.map(item => this.renderOutput(item, this.props[item.id]));

    return (
      <div className="outputs">
        {outputs}
      </div>
    );
  }
}
