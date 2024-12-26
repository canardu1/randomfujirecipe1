import { ColorOverlay } from './types';

const createOverlay = (color: string, opacity: number): string => {
  return `linear-gradient(${color}, ${color})`;
};

export const generateColorOverlay = (percent: number, warmColor: string, coolColor: string): string => {
  const color = percent > 0 ? warmColor : coolColor;
  const opacity = Math.abs(percent) * 0.003;
  return createOverlay(color, opacity);
};

export const OVERLAY_COLORS = {
  red: {
    warm: 'rgba(255,200,200,${opacity})',
    cool: 'rgba(200,255,255,${opacity})'
  },
  blue: {
    warm: 'rgba(200,200,255,${opacity})',
    cool: 'rgba(255,255,200,${opacity})'
  }
} as const;