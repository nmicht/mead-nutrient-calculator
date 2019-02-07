const GALLONS = 1;
const LITERS = 2;
const UNIT = 3.78542;
const YEAST_SELECTION = {
  "L-71B": 0.75,
  "L-BA-11": 1.25,
  "L-BM45": 0.9,
  "L-BM4X4": 1.25,
  "L-CLOS": 0.9,
  "L-CY3079": 1.25,
  "L-D21": 0.9,
  "L-D254": 0.9,
  "L-D47": 0.75,
  "L-D80": 0.9,
  "L-DV10": 0.75,
  "L-EC-1118": 0.75,
  "L-K1V-1116": 0.9,
  "L-QA23": 0.75,
  "L-R2": 0.9,
  "L-RC212": 0.9,
  "L-2226": 1.25,
  "RS-Cote-D": 1.25,
  "RS-Montrachet": 0.75,
  "RS-Pasteur-C": 0.75,
  "RS-Pasteur-R": 0.9,
  "RS-Premier-C": 0.9,
  "U-43": 0.75,
  "U-BDX": 0.9,
  "U-SVG": 0.9,
  "U-VRB": 0.9,
  "O-LOW": 0.75,
  "O-MED": 0.9,
  "O-HIGH": 1.25,
  "ALE": 0.75,
}

function getYeastNutrientRequirement(yeastSelection) {
  return YEAST_SELECTION[yeastSelection] || 0;
}

function getStartingGravityBrix(startingGravity) {
  let startingGravityBrix = 0;
  if(startingGravity < 1) {
    startingGravityBrix = 0;
  } else {
    startingGravityBrix = (((182.4601 * startingGravity - 775.6821) * startingGravity + 1262.7794) * startingGravity - 669.5622)
  }
  return startingGravityBrix || 0;
}

function getTotalNutrientNeedGrams({
  startingGravityBrix,
  batchSizeUnit,
  fruitSpecificGravity,
  yeastNutrientRequirement,
  nutrientPreference,
  batchSize,
  fruitSugarPercentage
}) {
  let totalNutrientNeedGrams = 0;

  if(batchSizeUnit === GALLONS){
    if(fruitSpecificGravity > 1){
      totalNutrientNeedGrams = (startingGravityBrix * 10 * yeastNutrientRequirement / nutrientPreference * batchSize) - ((fruitSugarPercentage / 100) * (startingGravityBrix * 10 * yeastNutrientRequirement / nutrientPreference * batchSize))
    } else {
      totalNutrientNeedGrams = startingGravityBrix * 10 * yeastNutrientRequirement / nutrientPreference * batchSize
    }
  } else {
    if(fruitSpecificGravity > 1) {
      totalNutrientNeedGrams = (startingGravityBrix * 10 * yeastNutrientRequirement / nutrientPreference * (batchSize / UNIT)) - ((fruitSugarPercentage / 100) * 10 * yeastNutrientRequirement / nutrientPreference * (batchSize / UNIT))
    } else {
      totalNutrientNeedGrams = startingGravityBrix * 10 * yeastNutrientRequirement / nutrientPreference * (batchSize / UNIT)
    }
  }

  return totalNutrientNeedGrams || 0;
}

export default {
  getStartingGravityBrix,
  getTotalNutrientNeedGrams,
  getYeastNutrientRequirement,
}
