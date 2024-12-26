export interface LightroomPreset {
  id: string;
  internalName: string;
  title: string;
  type: "Develop";
  value: LightroomSettings;
}

export interface LightroomSettings {
  processVersion: string;
  temperature: number;
  tint: number;
  exposure: number;
  contrast: number;
  highlights: number;
  shadows: number;
  whites: number;
  blacks: number;
  clarity: number;
  vibrance: number;
  saturation: number;
  toneCurve: {
    name: string;
    points: [number, number][];
  };
  grainAmount: number;
  grainSize: number;
  grainFrequency: number;
  splitToning: {
    highlights: { h: number; s: number };
    shadows: { h: number; s: number };
    balance: number;
  };
}