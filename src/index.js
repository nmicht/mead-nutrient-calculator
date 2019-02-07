import React from 'react';
import ReactDOM from 'react-dom';
import Form from './form/';
import Results from './results/';
import calc from './calc';

class MeadNutrientCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      batchSizeUnit: 1,
      nutrientPreference: 50,
      batchSize: '',
      startingGravity: '',
      yeastSelection: 'L-71B',
      fruitSpecificGravity: '',
      overrideYeastPitchRate: '',
      metricYeastPitchRateOverride: '',
    };

    this.form = {
      fields: [
      {
        id: 'batchSizeUnit',
        label: 'Unit of Measure for Batch Size',
        helpText: 'The unit you are using for your batch size.',
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
        helpText: 'Fermaid-O provides organic form of nitrogen, while Fermaid-K provides inorganic forms of nitrogen.',
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
        helpText: 'How big or small is your batch.',
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
        helpText: 'Each yeast provides a different requirement of nutrient.',
        type: 'select',
        required: true,
        options: [
          {value: "L-71B", text: "Lalvin 71B"},
          {value: "L-BA-11", text: "Lalvin BA 11"},
          {value: "L-BM45", text: "Lalvin BM45"},
          {value: "L-BM4X4", text: "Lalvin BM4X4"},
          {value: "L-CLOS", text: "Lalvin CLOS"},
          {value: "L-CY3079", text: "Lalvin CY3079"},
          {value: "L-D21", text: "Lalvin D21"},
          {value: "L-D254", text: "Lalvin D254"},
          {value: "L-D47", text: "Lalvin D47"},
          {value: "L-D80", text: "Lalvin D80"},
          {value: "L-DV10", text: "Lalvin DV10"},
          {value: "L-EC-1118", text: "Lalvin EC-1118"},
          {value: "L-K1V-1116", text: "Lalvin K1V-1116"},
          {value: "L-QA23", text: "Lalvin QA23"},
          {value: "L-R2", text: "Lalvin R2"},
          {value: "L-RC212", text: "Lalvin RC212"},
          {value: "L-2226", text: "Lalvin Rhone 2226"},
          {value: "RS-Cote-D", text: "Red Star Cote Des Blancs"},
          {value: "RS-Montrachet", text: "Red Star Montrachet"},
          {value: "RS-Pasteur-C", text: "Red Star Pasteur Champange"},
          {value: "RS-Pasteur-R", text: "Red Star Pasteur Red"},
          {value: "RS-Premier-C", text: "Red Star Premier Cuvee"},
          {value: "U-43", text: "Uvaferm 43"},
          {value: "U-BDX", text: "Uvaferm BDX"},
          {value: "U-SVG", text: "Uvaferm SVG"},
          {value: "U-VRB", text: "Uvaferm VRB"},
          {value: "O-LOW", text: "Other Low N Requirement"},
          {value: "O-MED", text: "Other Medium N Requirement"},
          {value: "0-HIGH", text: "Other High N Requirement"},
          {value: "ALE", text: "Ale / Lager Yeast"},
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

  get yeastNutrientRequirement() {
    return calc.getYeastNutrientRequirement(this.state.yeastSelection)
  }

  get startingGravityBrix() {
    return calc.getStartingGravityBrix(this.state.startingGravity);
  }

  get totalNutrientNeedGrams() {
    const {
      batchSizeUnit,
      fruitSpecificGravity,
      nutrientPreference,
      batchSize,
      fruitSugarPercentage,
    } = this.state;

    let data = {
      startingGravityBrix: this.startingGravityBrix,
      batchSizeUnit,
      fruitSpecificGravity,
      yeastNutrientRequirement: this.yeastNutrientRequirement,
      nutrientPreference,
      batchSize,
      fruitSugarPercentage,
    };

    return calc.getTotalNutrientNeedGrams(data);
  }

  get totalNutrientNeedOz() {
    return calc.getTotalNutrientNeedOz(this.totalNutrientNeedGrams);
  }

  get yeastNeed() {
    const {
      batchSize,
      startingGravity,
      batchSizeUnit,
      overrideYeastPitchRate,
      metricYeastPitchRateOverride,
    } = this.state;

    let data = {
      yeastPitchRate: this.yeastPitchRate,
      recommendedYeastPitchRateLt: this.recommendedYeastPitchRateLt,
      batchSize,
      startingGravity,
      batchSizeUnit,
      overrideYeastPitchRate,
      metricYeastPitchRateOverride,
    }
    return calc.getYeastNeed(data);
  }

  get goFermNeedOz() {
    return calc.getGoFermNeedOz(this.yeastNeed);
  }

  get goFermWaterNeedLt() {
    return calc.getGoFermWaterNeedLt(this.goFermNeedGram);
  }

  get goFermNeedGram() {
    return calc.getGoFermNeedGram(this.yeastNeed);
  }

  get goFermWaterNeedMl() {
    return calc.getGoFermWaterNeedMl(this.goFermNeedGram);
  }

  get nutrientStepGrams() {
    return calc.getNutrientStepGrams(this.totalNutrientNeedGrams);
  }

  get getNutrientStepOz() {
    return calc.getNutrientStepOz(this.totalNutrientNeedGrams);
  }

  get yeastPitchRate() {
    const {
      batchSize,
      startingGravity,
    } = this.state;

    let data = {
      batchSize,
      startingGravity,
    };

    return calc.getYeastPitchRate(data);
  }

  get fruitSugarPercentage() {
    const {
      fruitSpecificGravity,
      startingGravity,
    } = this.state;

    let data = {
      fruitSpecificGravity,
      startingGravity,
    };

    return calc.getFruitSugarPercentage(data);
  }

  get sugarBreak() {
    return calc.getSugarBreak(this.state.startingGravity);
  }

  get recommendedYeastPitchRateLt() {
    const {
      batchSize,
      startingGravity,
    } = this.state;

    let data = {
      batchSize,
      startingGravity,
    };

    return calc.getRecommendedYeastPitchRateLt(data);
  }

  handleChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h3>Mead Nutrient Calculator</h3>
        <Form inputs={this.state} fields={this.form.fields} />
        <Results
          fields={this.form.results}
          totalNutrientNeedGrams={this.totalNutrientNeedGrams}
          goFermNeedGram={this.goFermNeedGram}
          goFermNeedOz={this.goFermNeedOz}
          goFermWaterNeedLt={this.goFermWaterNeedLt}
          goFermWaterNeedMl={this.goFermWaterNeedMl}
          yeastNeed={this.yeastNeed}
          totalNutrientNeedOz={this.totalNutrientNeedOz}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <MeadNutrientCalculator />,
  document.getElementById('root')
);
