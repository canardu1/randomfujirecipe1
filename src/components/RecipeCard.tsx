import React, { useRef } from 'react';
import { Camera, Download } from 'lucide-react';
import { Recipe } from '../types/Recipe';
import html2canvas from 'html2canvas';

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = async () => {
    if (!cardRef.current) return;
    
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: '#262626',
      scale: 2
    });
    
    const link = document.createElement('a');
    link.download = `${recipe.name.toLowerCase().replace(/\s+/g, '-')}-recipe-card.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-4">
      <div
        ref={cardRef}
        className="fuji-panel p-6 rounded-lg space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-neutral-700 pb-4">
          <Camera className="w-8 h-8 text-[#b87a4b]" />
          <div>
            <h2 className="text-xl font-bold text-white">{recipe.name}</h2>
            <p className="text-sm text-neutral-400">Fujifilm Recipe</p>
          </div>
        </div>

        {/* Settings Stack */}
        <div className="space-y-6">
          {/* Base Settings */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-neutral-400">Base Settings</h3>
            <div className="bg-neutral-700/20 p-3 rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-300">Film Simulation</span>
                <span className="text-white font-medium">{recipe.filmSimulation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-300">Dynamic Range</span>
                <span className="text-white font-medium">{recipe.dynamicRange}</span>
              </div>
            </div>
          </div>

          {/* White Balance */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-neutral-400">White Balance</h3>
            <div className="bg-neutral-700/20 p-3 rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-300">White Balance</span>
                <span className="text-white font-medium">{recipe.whiteBalance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-300">WB Shift Red</span>
                <span className="text-white font-medium">{recipe.whiteBalanceShift.red}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-300">WB Shift Blue</span>
                <span className="text-white font-medium">{recipe.whiteBalanceShift.blue}</span>
              </div>
            </div>
          </div>

          {/* Tone */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-neutral-400">Tone</h3>
            <div className="bg-neutral-700/20 p-3 rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-300">Highlight</span>
                <span className="text-white font-medium">{recipe.highlight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-300">Shadow</span>
                <span className="text-white font-medium">{recipe.shadow}</span>
              </div>
            </div>
          </div>

          {/* Color & Detail */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-neutral-400">Color & Detail</h3>
            <div className="bg-neutral-700/20 p-3 rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-300">Color</span>
                <span className="text-white font-medium">{recipe.color}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-300">Sharpness</span>
                <span className="text-white font-medium">{recipe.sharpness}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-300">Grain Effect</span>
                <span className="text-white font-medium">{recipe.grainEffect}</span>
              </div>
              {recipe.grainEffect !== 'Off' && (
                <div className="flex justify-between">
                  <span className="text-neutral-300">Grain Size</span>
                  <span className="text-white font-medium">{recipe.grainSize}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={downloadCard}
        className="fuji-button w-full px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        Download Recipe Card
      </button>
    </div>
  );
}