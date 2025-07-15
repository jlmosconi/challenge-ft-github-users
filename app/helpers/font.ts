import {ScaledSize} from 'react-native';

const PhM = 380; // Phone Magic: Good constant number for phones.
const TaWidth = 768; // Tablet Width: Good avg for 3:4 tablets.
const MSW = 450; // Multiplier Starting Width: Multiplier starts to affect rem after this width.
const MSV = 1; // Multiplier Starting Value: Value in which multiplier affects rem.
const MTV = 0.7; // Multiplier Target Value: Value the multiplier will have when `TaWidth` is reached.

/**
 * Calculates the Relative unit (rem) that will be used throughout the styling
 * of the whole application. It's based on some common heuristics.
 *
 * @param {number} width - Device width
 * @param {number} height - Device height
 * @returns {number} - REM unit for this device
 */
export const calculateREMForDevice = ({width}: ScaledSize) => {
  let remValue = width / PhM; // Base REM value based on a good phone width

  // If the device width is greater than the Multiplier Starting Width
  if (width > MSW) {
    const multiplier = ((width - MSW) / (TaWidth - MSW)) * (MTV - MSV) + MSV; // Linear eq to calculate the multiplier
    remValue = remValue * multiplier; // Apply the multiplier to the base REM value
  }

  return remValue; // Return the calculated REM value
};
