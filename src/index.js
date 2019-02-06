import React from 'react';
import ReactDOM from 'react-dom';
import Form from './form/';
import Results from './results/';
import calc from './calc';

class MeadNutrientCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        batchSizeUnit: 1,
        nutrientPreference: 50,
        batchSize: '',
        startingGravity: '',
        yeastSelection: 0.75,
        fruitSpecificGravity: '',
        overrideYeastPitchRate: '',
        metricYeastPitchRateOverride: '',
      },
      results: {
        totalNutrientNeedGrams: 0,
        goFermWaterNeedLt: 0,
        goFermNeedOz: 0,
        goFermNeedGram: 0,
        goFermWaterNeedMl: 0,
        yeastNeed: 0,
        totalNutrientNeedOz: 0,
        nutrientStepGrams: 0,
        nutrientStepOz: 0,
        yeastPitchRate: 0,
        startingGravityBrix: 0,
        fruitSugarPercentage: 0,
        sugarBreak: 0,
        recommendedYeastPitchRateLt: 0,
      }
    };

    this.form = {
      fields: [
      {
        id: 'batchSizeUnit',
        label: 'Unit of Measure for Batch Size',
        type: 'radio',
        required: true,
        options: [
          { text: 'gallons', value: 1 },
          { text: 'liters', value: 2 },
        ],
        onChange: this.handleChange,
      },
      {
        id: 'nutrientPreference',
        label: 'Nutrient Preference',
        helpText: 'Example: 1.115',
        type: 'radio',
        required: true,
        options: [
          { text: 'Fermaid-O', value: 50 },
          { text: 'Fermaid-K', value: 100 },
        ],
        onChange: this.handleChange,
      },
      {
        id: 'batchSize',
        label: 'Batch Size',
        placeholder: 1,
        type: 'number',
        required: true,
        onChange: this.handleChange,
      },
      {
        id: 'startingGravity',
        label: 'Starting Gravity',
        placeholder: 1.100,
        helpText: 'Example: 1.115',
        type: 'number',
        step: 0.001,
        required: true,
        onChange: this.handleChange,
      },
      {
        id: 'yeastSelection',
        label: 'Yeast Selection',
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
        onChange: this.handleChange,
      },
      {
        id: 'fruitSpecificGravity',
        label: 'Specific Gravity of Fruit',
        placeholder: 0,
        helpText: 'Example: 1.035 (only if fermenting fruit in primary)',
        type: 'number',
        step: 0.001,
        required: false,
        onChange: this.handleChange,
      },
      {
        id: 'overrideYeastPitchRate',
        label: 'Override Yeast Pitch Rate',
        min: 0,
        max: 10,
        step: 0.5,
        helpText: 'Enter your preferred grams of yeast per gallon',
        type: 'range',
        required: false,
        onChange: this.handleChange,
      },
      {
        id: 'metricYeastPitchRateOverride',
        label: 'Metric Yeast Pitch Rate Override',
        helpText: 'Enter your preferred grams of yeast per liter',
        type: 'range',
        min: 0,
        max: 3,
        step: 0.25,
        required: false,
        onChange: this.handleChange,
      }
    ],
      results: [
        {
          id: 'totalNutrientNeedGrams',
          label: 'Total nutrient needed',
          unit: 'grams',
        },
        {
          id: 'goFermNeedGram',
          label: 'Go-Ferm needed',
          unit: 'grams',
        },
        {
          id: 'goFermNeedOz',
          label: 'Go-Ferm needed',
          unit: 'oz',
        },
        {
          id: 'goFermWaterNeedLt',
          label: 'Water to dilute Go-Ferm',
          unit: 'liters',
        },
        {
          id: 'goFermWaterNeedMl',
          label: 'Water to dilute Go-Ferm',
          unit: 'ml',
        },
        {
          id: 'yeastNeed',
          label: 'Yeast needed',
          unit: 'grams',
        },
        {
          id: 'totalNutrientNeedOz',
          label: 'Total nutrient needed',
          unit: 'oz',
        },
      ],
    };
  }

  handleChange = (event) => {
    this.setState({
      inputs: {
        ...this.state.inputs,
        [event.target.name]: event.target.value,
      },
      results: {
        ...this.state.results,
        startingGravityBrix: calc.getStartingGravityBrix(this.state.inputs),
        totalNutrientNeedGrams: calc.getTotalNutrientNeedGrams(this.state),
      }
    });
  }

  render() {
    return (
      <div>
        <h3>Mead Nutrient Calculator</h3>
        <Form inputs={this.state.inputs} fields={this.form.fields} />
        <Results results={this.state.results} fields={this.form.results} />
      </div>
    );
  }
}

ReactDOM.render(
  <MeadNutrientCalculator />,
  document.getElementById('root')
);
