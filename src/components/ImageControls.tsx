import React from 'react';
import { CropIcon, Frame } from 'lucide-react';
import { Recipe } from '../types/Recipe';
import { borderColors, BorderColor } from '../types/styles';
import { SpecialEffectsControls } from './SpecialEffectsControls';
import { aspectRatios } from '../data/constants';

interface ImageControlsProps {
  recipe: Recipe;
  onChange: (recipe: Recipe) => void;
}

export function ImageControls({ recipe, onChange }: ImageControlsProps) {
  const handleAspectRatioChange = (ratio: typeof aspectRatios[number]) => {
    onChange({ ...recipe, aspectRatio: ratio });
  };

  const handleBorderToggle = () => {
    onChange({
      ...recipe,
      border: {
        ...recipe.border,
        enabled: !recipe.border.enabled
      }
    });
  };

  const handleBorderColorChange = (color: BorderColor) => {
    onChange({
      ...recipe,
      border: {
        ...recipe.border,
        color: borderColors[color]
      }
    });
  };

  const handleBorderWidthChange = (width: number) => {
    onChange({
      ...recipe,
      border: {
        ...recipe.border,
        width: Math.max(0, Math.min(100, width))
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="fuji-panel p-6 rounded-lg space-y-6">
        {/* Aspect Ratio Controls */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <CropIcon className="w-5 h-5" />
            Aspect Ratio
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio}
                onClick={() => handleAspectRatioChange(ratio)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  recipe.aspectRatio === ratio
                    ? 'bg-[#b87a4b] text-white'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {/* Border Controls */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            <Frame className="w-5 h-5" />
            Border
          </h3>
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={recipe.border.enabled}
                onChange={handleBorderToggle}
                className="rounded border-neutral-600 text-[#b87a4b] focus:ring-[#b87a4b]"
              />
              <span className="text-neutral-300">Enable border</span>
            </label>

            {recipe.border.enabled && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm text-neutral-300">
                    Border Width ({recipe.border.width}px)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={recipe.border.width}
                    onChange={(e) => handleBorderWidthChange(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm text-neutral-300 mb-2">
                    Border Color
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {(Object.keys(borderColors) as BorderColor[]).map((color) => (
                      <button
                        key={color}
                        onClick={() => handleBorderColorChange(color)}
                        className={`h-8 rounded-md border relative ${
                          recipe.border.color === borderColors[color]
                            ? 'ring-2 ring-[#b87a4b] ring-offset-2 ring-offset-neutral-800'
                            : 'border-neutral-600 hover:border-neutral-400'
                        }`}
                        style={{ backgroundColor: borderColors[color] }}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Special Effects Controls */}
      <SpecialEffectsControls recipe={recipe} onChange={onChange} />
    </div>
  );
}