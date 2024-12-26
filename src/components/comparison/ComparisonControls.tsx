import React from 'react';
import { Eye, MoveHorizontal, Columns } from 'lucide-react';

interface ComparisonControlsProps {
  mode: 'slider' | 'split' | null;
  onModeChange: (mode: 'slider' | 'split' | null) => void;
}

export function ComparisonControls({ mode, onModeChange }: ComparisonControlsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onModeChange(mode === null ? 'slider' : null)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${
          mode === null
            ? 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
            : 'bg-[#b87a4b] text-white'
        }`}
      >
        <Eye className="w-4 h-4" />
        {mode === null ? 'Compare' : 'Hide Comparison'}
      </button>

      {mode !== null && (
        <>
          <button
            onClick={() => onModeChange('slider')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${
              mode === 'slider'
                ? 'bg-[#b87a4b] text-white'
                : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
            }`}
          >
            <MoveHorizontal className="w-4 h-4" />
            Slider
          </button>
          
          <button
            onClick={() => onModeChange('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${
              mode === 'split'
                ? 'bg-[#b87a4b] text-white'
                : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
            }`}
          >
            <Columns className="w-4 h-4" />
            Split View
          </button>
        </>
      )}
    </div>
  );
}