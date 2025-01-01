import { RGBColor } from './types';

// Generate a CSS filter for the halation glow effect
export const createGlowFilter = (
  color: RGBColor,
  strength: number,
  size: number,
  threshold: number
): string => {
  const alpha = Math.min(1, Math.max(0, strength));
  const blurRadius = Math.max(1, Math.round(size * 2));
  
  // Create multiple layers of glow with decreasing intensity
  const glowLayers = Array(3).fill(0).map((_, i) => {
    const layerAlpha = alpha * Math.pow(0.7, i);
    return `drop-shadow(0 0 ${blurRadius * (i + 1)}px rgba(${color.r},${color.g},${color.b},${layerAlpha}))`;
  });

  return [
    // Isolate bright areas
    `brightness(${1 + threshold})`,
    `contrast(${1 + threshold})`,
    
    // Apply color glow
    ...glowLayers,
    
    // Reset brightness/contrast
    `brightness(${1 / (1 + threshold)})`,
    `contrast(${1 / (1 + threshold)})`
  ].join(' ');
};