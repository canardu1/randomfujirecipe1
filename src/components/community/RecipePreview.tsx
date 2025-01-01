import React from 'react';
import { ThumbsUp, Download } from 'lucide-react';
import { Recipe } from '../../types/Recipe';
import { generateImageTransform } from '../../utils/colorScience/imageTransform';
import { downloadProcessedImage } from '../../utils/imageProcessing';

interface RecipePreviewProps {
  recipe: Recipe;
  votes: number;
  isVoted: boolean;
  onVote: (e: React.MouseEvent) => void;
  imageUrl: string;
  disabled?: boolean;
}

export function RecipePreview({ recipe, votes, isVoted, onVote, imageUrl, disabled }: RecipePreviewProps) {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProcessing(true);
    try {
      await downloadProcessedImage(imageUrl, recipe);
    } catch (error) {
      console.error('Failed to download image:', error);
    }
    setIsProcessing(false);
  };

  return (
    <div className="relative aspect-[3/2] rounded-lg overflow-hidden group">
      <img
        src={imageUrl}
        alt={recipe.name}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
        style={{ filter: generateImageTransform(recipe) }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">{recipe.name}</h3>
          <p className="text-sm text-neutral-200">{recipe.filmSimulation}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            disabled={isProcessing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
          >
            <Download className="w-4 h-4" />
            {isProcessing ? '...' : ''}
          </button>
          <button
            onClick={onVote}
            disabled={disabled}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium ${
              isVoted
                ? 'bg-[#b87a4b] text-white'
                : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <ThumbsUp className={`w-4 h-4 ${isVoted ? 'fill-white' : ''}`} />
            {votes}
          </button>
        </div>
      </div>
    </div>
  );
}