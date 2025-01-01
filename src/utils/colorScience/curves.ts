// Default linear curve points
export const getDefaultCurve = (): [number, number][] => [
  [0, 0],
  [64, 64],
  [128, 128],
  [192, 192],
  [255, 255]
];

// Helper to create a contrast curve
export const createContrastCurve = (contrast: number): [number, number][] => {
  const midpoint = 128;
  const points: [number, number][] = [];
  
  for (let i = 0; i <= 255; i += 64) {
    const input = i;
    let output = i;
    
    if (input < midpoint) {
      output = midpoint - (midpoint - input) * contrast;
    } else {
      output = midpoint + (input - midpoint) * contrast;
    }
    
    output = Math.max(0, Math.min(255, output));
    points.push([input, output]);
  }
  
  return points;
};