export interface BorderStyle {
  enabled: boolean;
  color: string;
  width: number;
}

export const borderColors = {
  white: '#ffffff',
  black: '#000000',
  bronze: '#b87a4b',
  'warm-white': '#f5f2ed',
  'cool-white': '#f0f2f5',
  'dark-gray': '#1a1a1a',
  'warm-gray': '#2a2624',
  'cool-gray': '#242628',
  brown: '#2c2420',
  'dark-green': '#1c2420'
} as const;

export type BorderColor = keyof typeof borderColors;