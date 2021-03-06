import React from 'react';
import ReactDOM from 'react-dom';
import Form from './form/';
import Results from './results/';
import calc from './calc';
import './index.css';

/**
 * The main class for the mead nutrient calculator
 * @extends React
 * @class MeadNutrientCalculator
 */
class MeadNutrientCalculator extends React.Component {
  constructor(props) {
    super(props);
    /**
     * On the state we keep only the data introduced by the user
     * @type {Object}
     */
    this.state = {
      batchSizeUnit: 1,
      nutrientPreference: 50,
      batchSize: '',
      startingGravity: '',
      yeastSelection: 'L-71B',
      fruitSpecificGravity: '',
      overrideYeastPitchRate: 0,
      metricYeastPitchRateOverride: 0,
    };

    /**
     * The form get the details for all the interactive elements in the input
     * Each block of the form get a property, and for each of this, get an array
     * of input objects
     *
     * FieldObject description:
     *  {string} id         The identifier for the form input
     *  {string} label      The label that should be used on the form
     *  {string} helpText   Some help text that can be included below the label
     *  {string} type       The type of html form interactive element
     *  {boolean} required  Indicate if the field is required or not
     *  {Array} options     A list of objects keeping the text and value for options
     *  used on radio, checkbox and selects.
     *  {function} onChange The function that will handle the change event on
     *  the component .
     *
     * @type {Object}
     */
    this.form = {
      fieldsPart1: [
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
          id: 'batchSize',
          label: 'Batch Size',
          helpText: 'How big or small is your batch.',
          placeholder: "Example: 1",
          type: 'number',
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
          id: 'startingGravity',
          label: 'Starting Gravity',
          placeholder: "Example: 1.115",
          helpText: 'Example: 1.115',
          type: 'number',
          step: 0.001,
          required: true,
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
          id: 'fruitSpecificGravity',
          label: 'Specific Gravity of Fruit',
          placeholder: "Example: 1.035",
          helpText: 'Example: 1.035 (only if fermenting fruit in primary)',
          type: 'number',
          step: 0.001,
          required: false,
          onChange: this.handleChange,
        },
      ],
      fieldsPart2: [
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
      results: {
        main: [
          {
            id: 'goFermNeedGram',
            label: 'Go-Ferm needed',
            unit: 'grams',
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
            id: 'totalNutrientNeedGrams',
            label: 'Total nutrient needed',
            unit: 'grams',
          },
          {
            id: 'nutrientStepGrams',
            label: 'Each nutrient addition (4 total)',
            unit: 'grams',
          },
        ],
        supplemental: [
          {
            id: 'sugarBreak',
            label: '1/3 Sugar Break',
            unit: '',
          },
          {
            id: 'startingGravityBrix',
            label: 'Starting Gravity Converted to Brix',
            unit: '',
          },
          {
            id: 'fruitSugarPercentage',
            label: 'Fruit Sugar Percentage',
            unit: '',
          },
        ],
        other: [
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
            id: 'yeastNeed',
            label: 'Yeast needed',
            unit: 'grams',
          },
          {
            id: 'totalNutrientNeedOz',
            label: 'Total nutrient needed',
            unit: 'oz',
          },
          {
            id: 'nutrientStepGrams',
            label: 'Each nutrient addition (4 total)',
            unit: 'grams',
          },
        ],
        pitch: [
          {
            id: 'yeastPitchRate',
            label: 'Recommended Yeast Pitch Rate',
            unit: 'g/gal',
          },
          {
            id: 'recommendedYeastPitchRateLt',
            label: 'Recommended Yeast Pitch Rate (liters)',
            unit: 'g/liter',
          },
        ]
      },
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
        <header>
          <h1>Mead Nutrient Calculator</h1>
        </header>
        <main>
          <p className="title">Enter your data</p>
          <Form inputs={this.state} fields={this.form.fieldsPart1} className="two-columns"/>

          <p className="title">Recommended Yeast Pitch Rate</p>
          <div className="results">
            <Results
              fields={this.form.results.pitch}
              yeastPitchRate={this.yeastPitchRate}
              recommendedYeastPitchRateLt={this.recommendedYeastPitchRateLt}
            />
          </div>

          <Form inputs={this.state} fields={this.form.fieldsPart2} className="two-columns"/>

          <p className="title">The breakdown</p>
          <div className="results">
            <Results
              fields={this.form.results.main}
              goFermWaterNeedMl={this.goFermWaterNeedMl}
              goFermNeedGram={this.goFermNeedGram}
              yeastNeed={this.yeastNeed}
              totalNutrientNeedGrams={this.totalNutrientNeedGrams}
              nutrientStepGrams={this.nutrientStepGrams}
            />
            <div className="helpText">
              <p><strong>NUTRIENT ADDITION SCHEDULE</strong></p>
              <p>Add each nutrient addition at 24, 48 & 72-hours after yeast pitch.</p>
              <p>The fourth nutrient addition is added at the 1/3 sugar break listed below, or Day 7. Whichever comes first.</p>
            </div>
          </div>

          <p className="title">Supplemental data</p>
          <div className="results">
            <Results
              fields={this.form.results.supplemental}
              startingGravityBrix={this.startingGravityBrix}
              sugarBreak={this.sugarBreak}
              fruitSugarPercentage={this.fruitSugarPercentage}
            />
          </div>

          <p className="title">Commercial Scale Dosage Rates</p>
          <div className="results">
            <Results
              fields={this.form.results.other}
              goFermNeedOz={this.goFermNeedOz}
              yeastNeed={this.yeastNeed}
              goFermWaterNeedLt={this.goFermWaterNeedLt}
              totalNutrientNeedOz={this.totalNutrientNeedOz}
              nutrientStepGrams={this.nutrientStepGrams}
            />
            <div className="helpText">
              <p><strong>NUTRIENT ADDITION SCHEDULE</strong></p>
              <p>Add each nutrient addition at 24, 48 & 72-hours after yeast pitch.</p>
              <p>The fourth nutrient addition is added at the 1/3 sugar break listed above, or Day 7. Whichever comes first.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

ReactDOM.render(
  <MeadNutrientCalculator />,
  document.getElementById('root')
);
