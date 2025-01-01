import { Recipe } from '../types/Recipe';
import { Camera, Heart } from 'lucide-react';
import { ExifPanel } from './ExifPanel';
import { HistogramPanel } from './HistogramPanel';
import { ToneCurvePanel } from './ToneCurvePanel';
import { RecipeCard } from './RecipeCard';
import { LightroomSettings } from './LightroomSettings';

interface RecipeDisplayProps {
  recipe: Recipe;
  imageUrl: string;
}

export function RecipeDisplay({ recipe, imageUrl }: RecipeDisplayProps) {
  return (
    <div className="space-y-4">
      <div className="fuji-panel rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Camera className="w-6 h-6 text-[#b87a4b]" />
            <h2 className="text-xl font-bold tracking-wide text-white">{recipe.name}</h2>
          </div>
          <a
            href="https://paypal.me/canardu"
            target="_blank"
            rel="noopener noreferrer"
            className="fuji-button px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1 hover:bg-[#b87a4b] transition-colors"
          >
            <Heart className="w-4 h-4" />
            Support
          </a>
        </div>

        <div className="space-y-4">
          {/* EXIF Panel */}
          <ExifPanel imageUrl={imageUrl} />

          {/* Histogram Panel */}
          <HistogramPanel imageUrl={imageUrl} recipe={recipe} />

          {/* Tone Curve Panel */}
          <ToneCurvePanel recipe={recipe} />
        </div>
      </div>

      <div className="fuji-panel p-6 rounded-lg">
        <RecipeCard recipe={recipe} />
      </div>

      <div className="fuji-panel p-6 rounded-lg">
        <LightroomSettings recipe={recipe} />
      </div>
    </div>
  );
}