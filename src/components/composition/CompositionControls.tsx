import React from 'react';
import { Grid, Circle } from 'lucide-react';

interface CompositionControlsProps {
  guide: 'rule-of-thirds' | 'golden-ratio' | 'center' | null;
  onGuideChange: (guide: 'rule-of-thirds' | 'golden-ratio' | 'center' | null) => void;
}

export function CompositionControls({ guide, onGuideChange }: CompositionControlsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onGuideChange(guide === 'rule-of-thirds' ? null : 'rule-of-thirds')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${
          guide === 'rule-of-thirds'
            ? 'bg-[#b87a4b] text-white'
            : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
        }`}
      >
        <Grid className="w-4 h-4" />
        Thirds
      </button>

      <button
        onClick={() => onGuideChange(guide === 'golden-ratio' ? null : 'golden-ratio')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${
          guide === 'golden-ratio'
            ? 'bg-[#b87a4b] text-white'
            : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
        }`}
      >
        <Grid className="w-4 h-4 rotate-45" />
        Golden
      </button>

      <button
        onClick={() => onGuideChange(guide === 'center' ? null : 'center')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${
          guide === 'center'
            ? 'bg-[#b87a4b] text-white'
            : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
        }`}
      >
        <Circle className="w-4 h-4" />
        Center
      </button>
    </div>
  );
}