export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface HalationProfile {
  color: RGBColor;
  strength: number;
  threshold: number;
  size: number;
}