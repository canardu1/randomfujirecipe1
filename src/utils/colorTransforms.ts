import { WhiteBalanceShift } from '../types/Recipe';

// Constants for white balance conversion
const WB_MAX = 9; // Maximum Fuji WB shift value
const TEMP_RANGE = 20; // Reduced from 100 to be more subtle
const TINT_RANGE = 15; // Reduced from 150 to be more subtle

// Convert Fuji WB shifts to standardized color adjustments
export const normalizeWhiteBalance = (shift: WhiteBalanceShift) => {
  // Convert -9 to +9 range to normalized values
  const temperature = (shift.red / WB_MAX) * TEMP_RANGE;
  const tint = (shift.blue / WB_MAX) * TINT_RANGE;
  
  return { temperature, tint };
};

// Generate CSS filters for preview
export const getWhiteBalanceFilter = (shift: WhiteBalanceShift): string => {
  // Scale factors for preview (can be stronger for visual feedback)
  const tempStrength = 0.4; // Reduced from 0.8
  const tintStrength = 0.2; // Reduced from 0.4
  
  // Normalize to -1 to 1 range
  const tempNormalized = shift.red / WB_MAX;
  const tintNormalized = shift.blue / WB_MAX;
  
  const filters: string[] = [];
  
  // Temperature (red shift)
  if (tempNormalized !== 0) {
    if (tempNormalized > 0) {
      // Warmer (more red)
      filters.push(`sepia(${tempNormalized * tempStrength})`);
      filters.push(`hue-rotate(-${tempNormalized * 15}deg)`);
      filters.push(`saturate(${1 + tempNormalized * 0.3})`);
    } else {
      // Cooler (more blue)
      filters.push(`brightness(${1 - Math.abs(tempNormalized) * 0.05})`);
      filters.push(`hue-rotate(${Math.abs(tempNormalized) * 15}deg)`);
      filters.push(`saturate(${1 + Math.abs(tempNormalized) * 0.2})`);
    }
  }
  
  // Tint (blue shift)
  if (tintNormalized !== 0) {
    if (tintNormalized > 0) {
      // More magenta
      filters.push(`hue-rotate(${tintNormalized * tintStrength * 25}deg)`);
      filters.push(`saturate(${1 + tintNormalized * 0.2})`);
    } else {
      // More green
      filters.push(`hue-rotate(-${Math.abs(tintNormalized) * tintStrength * 25}deg)`);
      filters.push(`saturate(${1 + Math.abs(tintNormalized) * 0.2})`);
    }
  }
  
  return filters.join(' ');
};