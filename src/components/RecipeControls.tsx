import React from 'react';
import { Recipe } from '../types/Recipe';
import { filmSimulations, dynamicRanges, grainEffects, grainSizes, whiteBalances } from '../data/recipes';

interface RecipeControlsProps {
  recipe: Recipe;
  onChange: (recipe: Recipe) => void;
}

export function RecipeControls({ recipe, onChange }: RecipeControlsProps) {
  const handleChange = (field: keyof Recipe, value: any) => {
    onChange({ ...recipe, [field]: value });
  };

  const handleWBShiftChange = (axis: 'red' | 'blue', value: number) => {
    onChange({
      ...recipe,
      whiteBalanceShift: {
        ...recipe.whiteBalanceShift,
        [axis]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Film Simulation</h3>
        <select
          value={recipe.filmSimulation}
          onChange={(e) => handleChange('filmSimulation', e.target.value)}
          className="w-full bg-neutral-700 text-white border-neutral-600 rounded-md"
        >
          {filmSimulations.map((sim) => (
            <option key={sim} value={sim}>{sim}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">White Balance</h3>
        <select
          value={recipe.whiteBalance}
          onChange={(e) => handleChange('whiteBalance', e.target.value)}
          className="w-full bg-neutral-700 text-white border-neutral-600 rounded-md"
        >
          {whiteBalances.map((wb) => (
            <option key={wb} value={wb}>{wb}</option>
          ))}
        </select>
        
        <div className="space-y-2">
          <label className="block text-sm text-neutral-300">
            Red Shift ({recipe.whiteBalanceShift.red})
          </label>
          <input
            type="range"
            min="-9"
            max="9"
            value={recipe.whiteBalanceShift.red}
            onChange={(e) => handleWBShiftChange('red', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm text-neutral-300">
            Blue Shift ({recipe.whiteBalanceShift.blue})
          </label>
          <input
            type="range"
            min="-9"
            max="9"
            value={recipe.whiteBalanceShift.blue}
            onChange={(e) => handleWBShiftChange('blue', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Dynamic Range</h3>
        <select
          value={recipe.dynamicRange}
          onChange={(e) => handleChange('dynamicRange', e.target.value)}
          className="w-full bg-neutral-700 text-white border-neutral-600 rounded-md"
        >
          {dynamicRanges.map((dr) => (
            <option key={dr} value={dr}>{dr}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Tone</h3>
        <div className="space-y-2">
          <label className="block text-sm text-neutral-300">
            Highlight ({recipe.highlight})
          </label>
          <input
            type="range"
            min="-2"
            max="4"
            value={recipe.highlight}
            onChange={(e) => handleChange('highlight', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm text-neutral-300">
            Shadow ({recipe.shadow})
          </label>
          <input
            type="range"
            min="-2"
            max="4"
            value={recipe.shadow}
            onChange={(e) => handleChange('shadow', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Color & Detail</h3>
        <div className="space-y-2">
          <label className="block text-sm text-neutral-300">
            Color ({recipe.color})
          </label>
          <input
            type="range"
            min="-4"
            max="4"
            value={recipe.color}
            onChange={(e) => handleChange('color', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm text-neutral-300">
            Sharpness ({recipe.sharpness})
          </label>
          <input
            type="range"
            min="-4"
            max="4"
            value={recipe.sharpness}
            onChange={(e) => handleChange('sharpness', parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Grain</h3>
        <select
          value={recipe.grainEffect}
          onChange={(e) => handleChange('grainEffect', e.target.value)}
          className="w-full bg-neutral-700 text-white border-neutral-600 rounded-md"
        >
          {grainEffects.map((effect) => (
            <option key={effect} value={effect}>{effect}</option>
          ))}
        </select>
        
        {recipe.grainEffect !== 'Off' && (
          <select
            value={recipe.grainSize}
            onChange={(e) => handleChange('grainSize', e.target.value)}
            className="w-full bg-neutral-700 text-white border-neutral-600 rounded-md"
          >
            {grainSizes.map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}