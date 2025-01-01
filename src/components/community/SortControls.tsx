import React from 'react';
import { TrendingUp, Clock, BookMarked } from 'lucide-react';

interface SortControlsProps {
  sortBy: 'votes' | 'newest' | 'my-recipes';
  onChange: (sort: 'votes' | 'newest' | 'my-recipes') => void;
  showMyRecipes?: boolean;
}

export function SortControls({ sortBy, onChange, showMyRecipes }: SortControlsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange('votes')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium ${
          sortBy === 'votes'
            ? 'bg-[#b87a4b] text-white'
            : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
        }`}
      >
        <TrendingUp className="w-4 h-4" />
        Most Popular
      </button>
      
      <button
        onClick={() => onChange('newest')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium ${
          sortBy === 'newest'
            ? 'bg-[#b87a4b] text-white'
            : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
        }`}
      >
        <Clock className="w-4 h-4" />
        Newest
      </button>

      {showMyRecipes && (
        <button
          onClick={() => onChange('my-recipes')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium ${
            sortBy === 'my-recipes'
              ? 'bg-[#b87a4b] text-white'
              : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
          }`}
        >
          <BookMarked className="w-4 h-4" />
          My Recipes
        </button>
      )}
    </div>
  );
}