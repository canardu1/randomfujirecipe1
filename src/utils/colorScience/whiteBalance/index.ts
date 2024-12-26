import { WhiteBalanceShift } from '../../../types/Recipe';
import { WhiteBalanceEffect } from './types';
import { shiftToPercentage } from './easing';
import { generateColorOverlay, OVERLAY_COLORS } from './overlays';

export const calculateWhiteBalanceTransform = (shift: WhiteBalanceShift): WhiteBalanceEffect => {
  const redPercent = shiftToPercentage(shift.red);
  const bluePercent = shiftToPercentage(shift.blue);

  return {
    tempEffect: {
      red: generateColorOverlay(redPercent, OVERLAY_COLORS.red.warm, OVERLAY_COLORS.red.cool),
      blue: generateColorOverlay(bluePercent, OVERLAY_COLORS.blue.warm, OVERLAY_COLORS.blue.cool)
    },
    tintEffect: {
      magenta: '',
      green: ''
    }
  };
};