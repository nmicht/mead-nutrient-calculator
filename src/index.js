import React from 'react';
import ReactDOM from 'react-dom';
import Form from './form/';

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
          value: "Lalvin 71B",
          type: 'select',
          required: true,
          options: [
            {value: "0.75", text: "Lalvin 71B"},
            {value: "1.25", text: "Lalvin BA 11"},
            {value: "0.9", text: "Lalvin BM45"},
            {value: "1.25", text: "Lalvin BM4X4"},
            {value: "0.9", text: "Lalvin CLOS"},
            {value: "1.25", text: "Lalvin CY3079"},
            {value: "0.9", text: "Lalvin D21"},
            {value: "0.9", text: "Lalvin D254"},
            {value: "0.75", text: "Lalvin D47"},
            {value: "0.9", text: "Lalvin D80"},
            {value: "0.75", text: "Lalvin DV10"},
            {value: "0.75", text: "Lalvin EC-1118"},
            {value: "0.9", text: "Lalvin K1V-1116"},
            {value: "0.75", text: "Lalvin QA23"},
            {value: "0.9", text: "Lalvin R2"},
            {value: "0.9", text: "Lalvin RC212"},
            {value: "1.25", text: "Lalvin Rhone 2226"},
            {value: "1.25", text: "Red Star Cote Des Blancs"},
            {value: "0.75", text: "Red Star Montrachet"},
            {value: "0.75", text: "Red Star Pasteur Champange"},
            {value: "0.9", text: "Red Star Pasteur Red"},
            {value: "0.9", text: "Red Star Premier Cuvee"},
            {value: "0.75", text: "Uvaferm 43"},
            {value: "0.9", text: "Uvaferm BDX"},
            {value: "0.9", text: "Uvaferm SVG"},
            {value: "0.9", text: "Uvaferm VRB"},
            {value: "0.75", text: "Other Low N Requirement"},
            {value: "0.9", text: "Other Medium N Requirement"},
            {value: "1.25", text: "Other High N Requirement"},
            {value: "0.75", text: "Ale / Lager Yeast"},
          ],
        },
        {
          id: 'fruitSpecificGravity',
          label: 'Specific Gravity of Fruit',
          value: 0,
          placeholder: 0,
          helpText: 'Example: 1.035 (only if fermenting fruit in primary)',
          type: 'number',
          required: false,
        },
        {
          id: 'overrideYeastPitchRate',
          label: 'Override Yeast Pitch Rate',
          value: 0,
          helpText: 'Enter your preferred grams of yeast per gallon',
          type: 'range',
          required: false,
        },
        {
          id: 'metricYeastPitchRateOverride',
          label: 'Metric Yeast Pitch Rate Override',
          value: 0,
          helpText: 'Enter your preferred grams of yeast per liter',
          type: 'range',
          required: false,
        }
      ],
    };
  }

  render() {
    return (
      <div>
        <h3>Mead Nutrient Calculator</h3>
        <Form {...this.state} />
      </div>
    );
  }
}

ReactDOM.render(
  <MeadNutrientCalculator />,
  document.getElementById('root')
);
