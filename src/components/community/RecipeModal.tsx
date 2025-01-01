import React from 'react';
import { X, ThumbsUp } from 'lucide-react';
import { Recipe } from '../../types/Recipe';
import { RecipeCard } from '../RecipeCard';

interface RecipeModalProps {
  recipe: {
    id: string;
    recipe: Recipe;
    votes: number;
    preview_url?: string;
    user_id: string;
  };
  isVoted: boolean;
  onVote: (id: string) => void;
  onClose: () => void;
  currentUserId?: string;
}

export function RecipeModal({ recipe, isVoted, onVote, onClose, currentUserId }: RecipeModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-neutral-800 p-4 border-b border-neutral-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{recipe.recipe.name}</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onVote(recipe.id)}
              disabled={!currentUserId}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium ${
                isVoted
                  ? 'bg-[#b87a4b] text-white'
                  : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
              } ${!currentUserId ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ThumbsUp className={`w-4 h-4 ${isVoted ? 'fill-white' : ''}`} />
              {recipe.votes}
            </button>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <RecipeCard recipe={recipe.recipe} />
        </div>
      </div>
    </div>
  );
}