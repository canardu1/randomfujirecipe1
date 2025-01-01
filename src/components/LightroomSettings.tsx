import { Recipe } from '../types/Recipe';
import { filmSimulationProfiles } from '../utils/presetExport/colorProfiles';

interface LightroomSettingsProps {
  recipe: Recipe;
}

export function LightroomSettings({ recipe }: LightroomSettingsProps) {
  const profile = filmSimulationProfiles[recipe.filmSimulation] || {
    profile: 'Adobe Standard',
    adjustments: {
      temperature: 0,
      tint: 0,
      vibrance: 0,
      saturation: 0,
      contrast: 0,
      highlights: 0,
      shadows: 0
    }
  };

  const grain = recipe.grainEffect === 'Off' 
    ? { amount: 0, size: 25 } 
    : { 
        amount: recipe.grainEffect === 'Weak' ? 25 : 50,
        size: recipe.grainSize === 'Small' ? 25 : 50
      };

  return (
    <div className="p-4 bg-neutral-700/20 rounded-lg">
      <h3 className="font-medium text-neutral-200 mb-4">Lightroom / Camera Raw Settings</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <span className="text-neutral-400">Profile:</span>
        <span className="font-medium text-white">{profile.profile}</span>

        <span className="text-neutral-400">Temperature:</span>
        <span className="font-medium text-white">
          {Math.round(recipe.whiteBalanceShift.red * 10 + profile.adjustments.temperature * 10)}
        </span>

        <span className="text-neutral-400">Tint:</span>
        <span className="font-medium text-white">
          {Math.round(recipe.whiteBalanceShift.blue * 10 + profile.adjustments.tint * 10)}
        </span>

        <span className="text-neutral-400">Exposure:</span>
        <span className="font-medium text-white">{recipe.exposureCompensation}</span>

        <span className="text-neutral-400">Contrast:</span>
        <span className="font-medium text-white">
          {recipe.highlight * 5 + profile.adjustments.contrast}
        </span>

        <span className="text-neutral-400">Highlights:</span>
        <span className="font-medium text-white">
          {recipe.highlight * 25 + profile.adjustments.highlights}
        </span>

        <span className="text-neutral-400">Shadows:</span>
        <span className="font-medium text-white">
          {recipe.shadow * 25 + profile.adjustments.shadows}
        </span>

        <span className="text-neutral-400">Whites:</span>
        <span className="font-medium text-white">{recipe.highlight * 15}</span>

        <span className="text-neutral-400">Blacks:</span>
        <span className="font-medium text-white">{recipe.shadow * 15}</span>

        <span className="text-neutral-400">Clarity:</span>
        <span className="font-medium text-white">{recipe.sharpness * 10}</span>

        <span className="text-neutral-400">Vibrance:</span>
        <span className="font-medium text-white">
          {recipe.color * 10 + profile.adjustments.vibrance}
        </span>

        <span className="text-neutral-400">Saturation:</span>
        <span className="font-medium text-white">
          {recipe.color * 8 + profile.adjustments.saturation}
        </span>

        <span className="text-neutral-400">Grain Amount:</span>
        <span className="font-medium text-white">{grain.amount}</span>

        <span className="text-neutral-400">Grain Size:</span>
        <span className="font-medium text-white">{grain.size}</span>

        {(recipe.filmSimulation === 'ACROS' || recipe.filmSimulation === 'Monochrome' || 
          recipe.filmSimulation === 'Tri-X 400' || recipe.filmSimulation === 'T-Max 400' ||
          recipe.filmSimulation === 'HP5 Plus' || recipe.filmSimulation === 'Delta 100' ||
          recipe.filmSimulation === 'Pan F Plus 50' || recipe.filmSimulation === 'XP2 Super') && (
          <>
            <span className="text-neutral-400">Convert to B&W:</span>
            <span className="font-medium text-white">Yes</span>
          </>
        )}
      </div>
    </div>
  );
}