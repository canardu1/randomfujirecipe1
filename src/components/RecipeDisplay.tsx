import { Recipe } from '../types/Recipe';
import { Camera, Heart } from 'lucide-react';
import { WhiteBalanceIcon } from './icons/WhiteBalanceIcon';
import { LightroomSettings } from './LightroomSettings';
import { RecipeCard } from './RecipeCard';
import { ExifPanel } from './ExifPanel';
import { HistogramPanel } from './HistogramPanel';

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
          <HistogramPanel imageUrl={imageUrl} />

          <div className="p-4 bg-neutral-700/20 rounded-lg">
            <h3 className="font-medium text-neutral-200 mb-2">Base Settings</h3>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-neutral-400">Film Simulation:</span>
              <span className="font-medium text-white">{recipe.filmSimulation}</span>
              
              <span className="text-neutral-400">Dynamic Range:</span>
              <span className="font-medium text-white">{recipe.dynamicRange}</span>
            </div>
          </div>

          {/* Rest of the panels remain unchanged */}
          <div className="p-4 bg-neutral-700/20 rounded-lg">
            <h3 className="font-medium text-neutral-200 mb-2">Tone & Color</h3>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-neutral-400">Highlight:</span>
              <span className="font-medium text-white">{recipe.highlight > 0 ? `+${recipe.highlight}` : recipe.highlight}</span>
              
              <span className="text-neutral-400">Shadow:</span>
              <span className="font-medium text-white">{recipe.shadow > 0 ? `+${recipe.shadow}` : recipe.shadow}</span>
              
              <span className="text-neutral-400">Color:</span>
              <span className="font-medium text-white">{recipe.color > 0 ? `+${recipe.color}` : recipe.color}</span>
            </div>
          </div>

          <div className="p-4 bg-neutral-700/20 rounded-lg">
            <h3 className="font-medium text-neutral-200 mb-2">Detail</h3>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-neutral-400">Sharpness:</span>
              <span className="font-medium text-white">{recipe.sharpness > 0 ? `+${recipe.sharpness}` : recipe.sharpness}</span>
              
              <span className="text-neutral-400">Noise Reduction:</span>
              <span className="font-medium text-white">{recipe.noiseReduction > 0 ? `+${recipe.noiseReduction}` : recipe.noiseReduction}</span>
              
              <span className="text-neutral-400">Grain Effect:</span>
              <span className="font-medium text-white">{recipe.grainEffect}</span>
              
              <span className="text-neutral-400">Grain Size:</span>
              <span className="font-medium text-white">{recipe.grainSize}</span>
            </div>
          </div>

          <div className="p-4 bg-neutral-700/20 rounded-lg">
            <h3 className="font-medium text-neutral-200 mb-2">White Balance</h3>
            <div className="grid grid-cols-2 gap-2">
              <span className="text-neutral-400">White Balance:</span>
              <span className="font-medium text-white flex items-center gap-1">
                <WhiteBalanceIcon type={recipe.whiteBalance as any} className="w-4 h-4" />
                {recipe.whiteBalance}
              </span>
              
              <span className="text-neutral-400">WB Shift:</span>
              <span className="font-medium text-white">
                R: {recipe.whiteBalanceShift.red > 0 ? '+' : ''}{recipe.whiteBalanceShift.red}, 
                B: {recipe.whiteBalanceShift.blue > 0 ? '+' : ''}{recipe.whiteBalanceShift.blue}
              </span>
              
              <span className="text-neutral-400">Exposure Comp:</span>
              <span className="font-medium text-white">{recipe.exposureCompensation}</span>
            </div>
          </div>

          <LightroomSettings recipe={recipe} />
        </div>
      </div>

      <div className="fuji-panel p-6 rounded-lg">
        <RecipeCard recipe={recipe} />
      </div>
    </div>
  );
}