const GALLONS = 1;
const LITERS = 2;

const UNIT = 3.78542;

function getStartingGravityBrix(inputs) {
  let startingGravityBrix = 0;
  if(inputs.startingGravity < 1) {
    startingGravityBrix = 0;
  } else {
    startingGravityBrix = (((182.4601 * inputs.startingGravity - 775.6821) * inputs.startingGravity + 1262.7794) * inputs.startingGravity - 669.5622)
  }
  return startingGravityBrix;
}

function getTotalNutrientNeedGrams(v) {
  let totalNutrientNeedGrams = 0;

  if(v.inputs.batchSizeUnit === GALLONS){
    if(v.inputs.fruitSpecificGravity > 1){
      totalNutrientNeedGrams = (v.results.startingGravityBrix * 10 * v.inputs.yeastSelection / v.inputs.nutrientPreference * v.inputs.batchSize) - ((v.inputs.fruitSugarPercentage / 100) * (v.results.startingGravityBrix * 10 * v.inputs.yeastSelection / v.inputs.nutrientPreference * v.inputs.batchSize))
    } else {
      totalNutrientNeedGrams = v.results.startingGravityBrix * 10 * v.inputs.yeastSelection / v.inputs.nutrientPreference * v.inputs.batchSize
    }
  } else {
    if(v.inputs.fruitSpecificGravity > 1) {
      totalNutrientNeedGrams = (v.results.startingGravityBrix * 10 * v.inputs.yeastSelection / v.inputs.nutrientPreference * (v.inputs.batchSize / UNIT)) - ((v.inputs.fruitSugarPercentage / 100) * 10 * v.inputs.yeastSelection / v.inputs.nutrientPreference * (v.inputs.batchSize / UNIT))
    } else {
      totalNutrientNeedGrams = v.results.startingGravityBrix * 10 * v.inputs.yeastSelection / v.inputs.nutrientPreference * (v.inputs.batchSize / UNIT)
    }
  }

  return totalNutrientNeedGrams || 0;
}

export default {
  getStartingGravityBrix,
  getTotalNutrientNeedGrams,
}
