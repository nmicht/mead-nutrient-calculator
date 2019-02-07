const GALLONS = 1;
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

/**
 * Get Yeast Nutrient Requirement
 * @param  {string} yeastSelection The yeast identifier
 * @return {number}               The nutrient requirement for the specific yeast
 */
function getYeastNutrientRequirement(yeastSelection) {
  return YEAST_SELECTION[yeastSelection] || 0;
}

/**
 * Get Starting Gravity Brix
 * @param  {number} startingGravity The starting gravity
 * @return {number}                 The gravity brix
 */
function getStartingGravityBrix(startingGravity) {
  let startingGravityBrix = 0;
  if(startingGravity < 1) {
    startingGravityBrix = 0;
  } else {
    startingGravityBrix = (((182.4601 * startingGravity - 775.6821) * startingGravity + 1262.7794) * startingGravity - 669.5622)
  }
  return startingGravityBrix || 0;
}

/**
 * Get Total Nutrient Need Grams
 * @param  {number} startingGravityBrix      [description]
 * @param  {number} batchSizeUnit            [description]
 * @param  {number} fruitSpecificGravity     [description]
 * @param  {number} yeastNutrientRequirement [description]
 * @param  {number} nutrientPreference       [description]
 * @param  {number} batchSize                [description]
 * @param  {number} fruitSugarPercentage     [description]
 * @return {number}                          [description]
 */
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

/**
 * Get Total Nutrient Need Oz
 * @param  {number} totalNutrientNeedGrams [description]
 * @return {number}                        [description]
 */
function getTotalNutrientNeedOz(totalNutrientNeedGrams) {
  return totalNutrientNeedGrams * 0.0352739619;
}

/**
 * Get Yeast Need
 * @param  {number} batchSize                    [description]
 * @param  {number} startingGravity              [description]
 * @param  {number} batchSizeUnit                [description]
 * @param  {number} overrideYeastPitchRate       [description]
 * @param  {number} yeastPitchRate               [description]
 * @param  {number} metricYeastPitchRateOverride [description]
 * @param  {number} recommendedYeastPitchRateLt  [description]
 * @return {number}                              [description]
 */
function getYeastNeed({
  batchSize,
  startingGravity,
  batchSizeUnit,
  overrideYeastPitchRate,
  yeastPitchRate,
  metricYeastPitchRateOverride,
  recommendedYeastPitchRateLt
}) {
  let yeastNeed = 0;

  if(!batchSize) {
    yeastNeed = 0;
  } else {
    if(!startingGravity) {
      yeastNeed = 0;
    } else {
      if(batchSizeUnit === GALLONS) {
        if(!overrideYeastPitchRate) {
          yeastNeed = yeastPitchRate * batchSize;
        } else {
          yeastNeed = overrideYeastPitchRate * batchSize
        }
      } else {
        if(!metricYeastPitchRateOverride) {
          yeastNeed = recommendedYeastPitchRateLt * batchSize
        } else {
          yeastNeed = metricYeastPitchRateOverride * batchSize
        }
      }
    }
  }
  return yeastNeed;
}

/**
 * Get Go Ferm Need Oz
 * @param  {number} yeastNeed [description]
 * @return {number}           [description]
 */
function getGoFermNeedOz(yeastNeed) {
  return (yeastNeed * 1.25) * 0.0352739619;
}

/**
 * Get Go Ferm Water Need Lt
 * @param  {number} goFermNeedGram [description]
 * @return {number}                [description]
 */
function getGoFermWaterNeedLt(goFermNeedGram) {
  return goFermNeedGram * 0.02;
}

/**
 * Get Go Ferm Need Gram
 * @param  {number} yeastNeed [description]
 * @return {number}           [description]
 */
function getGoFermNeedGram(yeastNeed) {
  return yeastNeed * 1.25;
}

/**
 * Get Go Ferm Water Need Ml
 * @param  {number} goFermNeedGram [description]
 * @return {number}                [description]
 */
function getGoFermWaterNeedMl(goFermNeedGram) {
  return goFermNeedGram * 20;
}

/**
 * Get Nutrient Step Grams
 * @param  {number} totalNutrientNeedGrams [description]
 * @return {number}                        [description]
 */
function getNutrientStepGrams(totalNutrientNeedGrams) {
  return totalNutrientNeedGrams / 4;
}

/**
 * Get Nutrient Step Oz
 * @param  {number} totalNutrientNeedGrams [description]
 * @return {number}                        [description]
 */
function getNutrientStepOz(totalNutrientNeedGrams) {
  return (totalNutrientNeedGrams / 4) * 0.0352739619;
}

/**
 * Get Yeast Pitch Rate
 * @param  {number} batchSize       [description]
 * @param  {number} startingGravity [description]
 * @return {number}                 [description]
 */
function getYeastPitchRate({
  batchSize,
  startingGravity
}) {
  let yeastPitchRate = 0;

  if(!batchSize) {
    yeastPitchRate = 0;
  } else {
    if(startingGravity < 1.100) {
      yeastPitchRate = 1;
    } else {
      if(startingGravity < 1.130) {
        yeastPitchRate = 2;
      } else {
        if(startingGravity < 1.160) {
          yeastPitchRate = 3;
        } else {
          yeastPitchRate = 4;
        }
      }
    }
  }

  return yeastPitchRate;
}

/**
 * Get Fruit Sugar Percentage
 * @param  {number} fruitSpecificGravity [description]
 * @param  {number} startingGravity      [description]
 * @return {number}                      [description]
 */
function getFruitSugarPercentage({
  fruitSpecificGravity,
  startingGravity
}) {
  let fruitSugarPercentage = 0;

  if(fruitSpecificGravity > 1) {
    fruitSugarPercentage = (100 / (startingGravity * 1000 - 1000)) * (fruitSpecificGravity * 1000 - 1000)
  } else {
    fruitSugarPercentage = 0;
  }

  return fruitSugarPercentage;
}

/**
 * Get Sugar Break
 * @param  {number} startingGravity [description]
 * @return {number}                 [description]
 */
function getSugarBreak(startingGravity) {
  let sugarBreak = 0;

  if(startingGravity < 1) {
    sugarBreak = 0;
  } else {
    if(startingGravity < 1.106) {
      sugarBreak = ((startingGravity * 1000 - 1000) - (0.33 * (startingGravity * 1000 - 1000)) + 1000) / 1000;
    } else {
      sugarBreak = ((startingGravity * 1000 - 1000) - (0.3465 * (startingGravity * 1000 - 1000)) + 1000) / 1000;
    }
  }

  return sugarBreak;
}

/**
 * Get Recommended Yeast Pitch Rate Lt
 * @param  {number} batchSize       [description]
 * @param  {number} startingGravity [description]
 * @return {number}                 [description]
 */
function getRecommendedYeastPitchRateLt({
  batchSize,
  startingGravity
}) {
  let recommendedYeastPitchRateLt = 0;

  if(!batchSize) {
    recommendedYeastPitchRateLt = 0;
  } else {
    if(startingGravity < 1.100) {
      recommendedYeastPitchRateLt = 0.25;
    } else {
      if(startingGravity < 1.130) {
        recommendedYeastPitchRateLt = 0.50;
      } else {
        if(startingGravity < 1.160) {
          recommendedYeastPitchRateLt = 0.75;
        } else {
          recommendedYeastPitchRateLt = 1;
        }
      }
    }
  }

  return recommendedYeastPitchRateLt;
}

/**
 * The module for the mead nutrient calculations.
 * @module calc
 */
export default {
  getStartingGravityBrix,
  getTotalNutrientNeedGrams,
  getTotalNutrientNeedOz,
  getYeastNutrientRequirement,
  getYeastNeed,
  getGoFermNeedGram,
  getGoFermNeedOz,
  getGoFermWaterNeedLt,
  getGoFermWaterNeedMl,
  getNutrientStepGrams,
  getNutrientStepOz,
  getYeastPitchRate,
  getFruitSugarPercentage,
  getSugarBreak,
  getRecommendedYeastPitchRateLt,
}
