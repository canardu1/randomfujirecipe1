import React from 'react';
import { TrendingUp, Clock } from 'lucide-react';

interface CommunityHeaderProps {
  sortBy: 'votes' | 'newest';
  onSortChange: (sort: 'votes' | 'newest') => void;
}

export function CommunityHeader({ sortBy, onSortChange }: CommunityHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold text-white">Community Recipes</h1>
      
      <div className="flex gap-2">
        <button
          onClick={() => onSortChange('votes')}
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
          onClick={() => onSortChange('newest')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium ${
            sortBy === 'newest'
              ? 'bg-[#b87a4b] text-white'
              : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
          }`}
        >
          <Clock className="w-4 h-4" />
          Newest
        </button>
      </div>
    </div>
  );
}