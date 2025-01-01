import React from 'react';
import { Camera, Film, Clapperboard, Instagram } from 'lucide-react';

interface FilmSimulationCategoriesProps {
  selectedCategories: string[];
  onChange: (categories: string[]) => void;
}

export function FilmSimulationCategories({ selectedCategories, onChange }: FilmSimulationCategoriesProps) {
  const categories = [
    { id: 'fujifilm', label: 'Fujifilm', icon: Camera, simulations: ['Classic Neg', 'Velvia', 'Classic Chrome', 'PROVIA/Standard', 'ASTIA/Soft', 'PRO Neg Hi', 'PRO Neg Std', 'Eterna', 'ACROS', 'Monochrome'] },
    { id: 'kodak', label: 'Kodak', icon: Film, simulations: ['Portra 160', 'Portra 400', 'Portra 800', 'Ektar 100', 'Gold 200', 'ColorPlus 200', 'Tri-X 400', 'T-Max 400'] },
    { id: 'ilford', label: 'Ilford', icon: Film, simulations: ['HP5 Plus', 'Delta 100', 'Pan F Plus 50', 'XP2 Super'] },
    { id: 'cinestill', label: 'CineStill', icon: Film, simulations: ['CineStill 50D', 'CineStill 800T'] },
    { id: 'cinematic', label: 'Cinematic', icon: Clapperboard, simulations: ['Deakins Natural', 'Deakins Contrast', 'Urban Night', 'Muted Noir', 'Blade Runner', 'Matrix Green', 'Ozark Blue', 'Mexican Yellow', 'Neon Nights', 'Vintage Technicolor', 'Nordic Winter', 'Desert Gold', 'Moonlight', 'Autumn', 'Emerald City', 'Pastel Dream'] },
    { id: 'instagram', label: 'Modern', icon: Instagram, simulations: ['Golden Hour', 'Minimal Mood', 'Urban Fade', 'Cafe Tones', 'Travel Story', 'Clean Portrait'] }
  ];

  const toggleCategory = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    
    // Ensure at least one category is selected
    if (newCategories.length > 0) {
      onChange(newCategories);
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-neutral-400">Film Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => toggleCategory(id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${
              selectedCategories.includes(id)
                ? 'bg-[#b87a4b] text-white'
                : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}