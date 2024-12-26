import { Recipe } from '../../types/Recipe';

// White balance temperature presets in Kelvin
const WB_TEMPERATURES = {
  Auto: { temp: 5500, tint: 0 },
  Daylight: { temp: 5500, tint: 0 },
  Shade: { temp: 7500, tint: 10 },
  Cloudy: { temp: 6500, tint: 10 },
  Tungsten: { temp: 3200, tint: 0 },
  Fluorescent: { temp: 4000, tint: 15 }
} as const;

// Convert RGB to HSL
const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
};

// Convert HSL to RGB
const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
};

export const calculateWhiteBalanceTransform = (recipe: Recipe): (imageData: ImageData) => void => {
  const baseWB = WB_TEMPERATURES[recipe.whiteBalance];
  const redShift = recipe.whiteBalanceShift.red / 9;
  const blueShift = recipe.whiteBalanceShift.blue / 9;

  return (imageData: ImageData) => {
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];

      // Convert to HSL
      let [h, s, l] = rgbToHsl(r, g, b);

      // Apply temperature shift
      if (redShift !== 0) {
        h += redShift * 10;
        s += redShift * 5;
      }

      // Apply blue shift
      if (blueShift !== 0) {
        h += blueShift * -10;
        s += Math.abs(blueShift) * 5;
      }

      // Normalize hue
      h = ((h % 360) + 360) % 360;
      // Clamp saturation and lightness
      s = Math.max(0, Math.min(100, s));
      l = Math.max(0, Math.min(100, l));

      // Convert back to RGB
      const [newR, newG, newB] = hslToRgb(h, s, l);

      imageData.data[i] = newR;
      imageData.data[i + 1] = newG;
      imageData.data[i + 2] = newB;
    }
  };
};