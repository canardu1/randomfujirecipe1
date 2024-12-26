import React from 'react';
import { CropIcon, Frame } from 'lucide-react';
import { Recipe } from '../types/Recipe';
import { borderColors, BorderColor } from '../types/styles';

interface ImageControlsProps {
  recipe: Recipe;
  onChange: (recipe: Recipe) => void;
}

export function ImageControls({ recipe, onChange }: ImageControlsProps) {
  const handleAspectRatioChange = (aspectRatio: Recipe['aspectRatio']) => {
    onChange({ ...recipe, aspectRatio });
  };

  const handleBorderChange = (changes: Partial<Recipe['border']>) => {
    onChange({
      ...recipe,
      border: {
        ...recipe.border,
        ...changes
      }
    });
  };

  return (
    <div className="fuji-panel p-6 rounded-lg space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white flex items-center gap-2">
          <CropIcon className="w-5 h-5" />
          Aspect Ratio
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {(['Original', '3:2', '16:9', '1:1'] as const).map((ratio) => (
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
              onChange={(e) => handleBorderChange({ enabled: e.target.checked })}
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
                  min="1"
                  max="100"
                  value={recipe.border.width}
                  onChange={(e) => handleBorderChange({ width: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-neutral-300 mb-2">
                  Border Color
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.entries(borderColors) as [BorderColor, string][]).map(([name, color]) => (
                    <button
                      key={name}
                      onClick={() => handleBorderChange({ color })}
                      className={`h-8 rounded-md border ${
                        recipe.border.color === color
                          ? 'ring-2 ring-[#b87a4b] ring-offset-2 ring-offset-neutral-800'
                          : 'border-neutral-600'
                      }`}
                      style={{ backgroundColor: color }}
                      title={name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}