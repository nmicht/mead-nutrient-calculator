import React from 'react';
import ReactDOM from 'react-dom';
import Input from './input/';
import Radio from './radio/';

class MeadNutrientCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 'batchSizeUnit',
          label: 'Unit of Measure for Batch Size',
          value: 1,
          type: 'radio',
          required: true,
          options: [
            { text: 'gallons', value: 1 },
            { text: 'liters', value: 2 },
          ],
        },
        {
          id: 'nutrientPreference',
          label: 'Nutrient Preference',
          value: 50,
          helpText: 'Example: 1.115',
          type: 'radio',
          required: true,
          options: [
            { text: 'Fermaid-O', value: 50 },
            { text: 'Fermaid-K', value: 100 },
          ],
        },
        {
          id: 'batchSize',
          label: 'Batch Size',
          value: undefined,
          placeholder: 1,
          type: 'number',
          required: true,
        },
        {
          id: 'startingGravity',
          label: 'Starting Gravity',
          value: undefined,
          placeholder: 1.100,
          helpText: 'Example: 1.115',
          type: 'number',
          required: true,
        },
        {
          id: 'yeastSelection',
          label: 'Yeast Selection',
          value: undefined,
          placeholder: 0.75,
          type: 'select',
          required: true,
        },
        {
          id: 'fruitSpecificGravity',
          label: 'Specific Gravity of Fruit',
          value: undefined,
          placeholder: 0,
          helpText: 'Example: 1.035 (only if fermenting fruit in primary)',
          type: 'number',
          required: false,
        },
        {
          id: 'overrideYeastPitchRate',
          label: 'Override Yeast Pitch Rate',
          value: 0,
          placeholder: 0,
          helpText: 'Enter your preferred grams of yeast per gallon',
          type: 'range',
          required: false,
        },
        {
          id: 'metricYeastPitchRateOverride',
          label: 'Metric Yeast Pitch Rate Override',
          value: 0,
          placeholder: 0,
          helpText: 'Enter your preferred grams of yeast per liter',
          type: 'range',
          required: false,
        }
      ],
    };
  }

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
      // return (
      //   <Select
      //     key={item.id}
      //     {...item}
      //     onChange={this.handleChange}
      //   />
      // );
      return 'select';
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
    const inputs = this.state.items.map(item => this.renderInput(item));

    return (
      <div>
        <h3>Mead Nutrient Calculator</h3>
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

ReactDOM.render(
  <MeadNutrientCalculator />,
  document.getElementById('root')
);
