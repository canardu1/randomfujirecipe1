// Convert shift value (-9 to 9) to a percentage (0 to 100)
export const shiftToPercentage = (value: number): number => {
  // Use a cubic easing function for more gradual changes
  const normalized = value / 9; // -1 to 1
  return Math.round((Math.pow(Math.abs(normalized), 1.5) * 100) * Math.sign(normalized));
};