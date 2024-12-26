import React from 'react';
import { Recipe } from '../../types/Recipe';
import { generateImageTransform } from '../../utils/colorScience/imageTransform';

interface SplitViewProps {
  imageUrl: string;
  recipe: Recipe;
}

export function SplitView({ imageUrl, recipe }: SplitViewProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="text-sm text-neutral-400 text-center">Original</div>
        <div className="aspect-[3/2] rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt="Original"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-neutral-400 text-center">Processed</div>
        <div className="aspect-[3/2] rounded-lg overflow-hidden">
          <img
            src={imageUrl}
            alt="Processed"
            className="w-full h-full object-cover"
            style={{ filter: generateImageTransform(recipe) }}
          />
        </div>
      </div>
    </div>
  );
}