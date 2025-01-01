import React from 'react';
import { X } from 'lucide-react';
import { Recipe } from '../../types/Recipe';
import { generateImageTransform } from '../../utils/colorScience/imageTransform';

interface PreviewImageModalProps {
  recipe: Recipe;
  imageUrl: string;
  onClose: () => void;
}

export function PreviewImageModal({ recipe, imageUrl, onClose }: PreviewImageModalProps) {
  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-[90vw] max-h-[90vh]">
        <img
          src={imageUrl}
          alt={recipe.name}
          className="w-full h-full object-contain"
          style={{ filter: generateImageTransform(recipe) }}
        />
      </div>
    </div>
  );
}