// Helper to create smooth transitions for white balance shifts
export const createColorShift = (value: number, maxIntensity: number = 0.15): string => {
  if (value === 0) return '';
  
  // Use a quadratic easing for smoother transitions
  const normalizedValue = value / 9; // Convert -9..9 to -1..1
  const intensity = Math.pow(Math.abs(normalizedValue), 1.5) * maxIntensity;
  
  const filters: string[] = [];
  
  if (value > 0) {
    // Warm shift (more red/yellow)
    filters.push(`sepia(${intensity})`);
    filters.push(`hue-rotate(-${intensity * 30}deg)`);
    filters.push(`saturate(${1 + intensity * 0.5})`);
  } else {
    // Cool shift (more blue/cyan)
    filters.push(`sepia(${intensity})`);
    filters.push(`hue-rotate(${intensity * 60}deg)`);
    filters.push(`saturate(${1 + intensity * 0.3})`);
  }
  
  return filters.join(' ');
};