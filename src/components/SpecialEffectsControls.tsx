import React from 'react';
import { Sparkles } from 'lucide-react';
import { Recipe } from '../types/Recipe';

interface SpecialEffectsControlsProps {
  recipe: Recipe;
  onChange: (recipe: Recipe) => void;
}

export function SpecialEffectsControls({ recipe, onChange }: SpecialEffectsControlsProps) {
  return (
    <div className="fuji-panel p-6 rounded-lg space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Special Effects
        </h3>
        <p className="text-sm text-neutral-400">No special effects available</p>
      </div>
    </div>
  );
}