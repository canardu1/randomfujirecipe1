import React from 'react';
import { Recipe } from '../../types/Recipe';
import { RecipePreview } from './RecipePreview';

interface RecipeGridProps {
  recipes: Array<{
    id: string;
    recipe: Recipe;
    preview_url?: string;
    votes: number;
  }>;
  onRecipeClick: (id: string) => void;
  onVote: (id: string) => void;
  userVotes: Set<string>;
  currentUserId?: string;
}

export function RecipeGrid({ recipes, onRecipeClick, onVote, userVotes, currentUserId }: RecipeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map((item) => (
        <div
          key={item.id}
          onClick={() => onRecipeClick(item.id)}
          className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#b87a4b] rounded-lg"
          role="button"
          tabIndex={0}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onRecipeClick(item.id);
            }
          }}
        >
          <RecipePreview
            recipe={item.recipe}
            votes={item.votes}
            isVoted={userVotes.has(item.id)}
            onVote={(e) => {
              e.stopPropagation();
              onVote(item.id);
            }}
            imageUrl={item.preview_url || 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81'}
            disabled={!currentUserId}
          />
        </div>
      ))}
    </div>
  );
}