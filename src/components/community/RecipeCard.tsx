import React, { useState } from 'react';
import { ThumbsUp, Camera, Download, Edit2, FileText } from 'lucide-react';
import { Recipe } from '../../types/Recipe';
import { RecipePreview } from './RecipePreview';
import { WhiteBalanceIcon } from '../icons/WhiteBalanceIcon';
import { PreviewImageModal } from './PreviewImageModal';
import { downloadProcessedImage } from '../../utils/imageProcessing';
import { supabase } from '../../lib/supabase';
import html2canvas from 'html2canvas';

interface RecipeCardProps {
  recipe: {
    id: string;
    recipe: Recipe;
    votes: number;
    preview_url?: string;
    created_at: string;
    user_id: string;
  };
  isVoted: boolean;
  onVote: (id: string) => void;
  onClick: () => void;
  disabled?: boolean;
  currentUserId?: string;
}

export function RecipeCard({ recipe, isVoted, onVote, onClick, disabled, currentUserId }: RecipeCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(recipe.recipe.name);
  const [isProcessing, setIsProcessing] = useState(false);
  const isOwner = currentUserId === recipe.user_id;

  const handleVoteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onVote(recipe.id);
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPreview(true);
  };

  const handleDownloadImage = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsProcessing(true);
    try {
      await downloadProcessedImage(
        recipe.preview_url || 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81',
        recipe.recipe
      );
    } catch (error) {
      console.error('Failed to download image:', error);
    }
    setIsProcessing(false);
  };

  const handleDownloadRecipe = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const cardElement = document.createElement('div');
    cardElement.className = 'fuji-panel p-6 rounded-lg';
    cardElement.innerHTML = `
      <div class="flex items-center gap-3 border-b border-neutral-700 pb-4">
        <div>
          <h2 class="text-xl font-bold text-white">${recipe.recipe.name}</h2>
          <p class="text-sm text-neutral-400">Fujifilm Recipe</p>
        </div>
      </div>
    `;

    const canvas = await html2canvas(cardElement, {
      backgroundColor: '#262626',
      scale: 2
    });
    
    const link = document.createElement('a');
    link.download = `${recipe.recipe.name.toLowerCase().replace(/\s+/g, '-')}-recipe-card.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleRename = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isRenaming) {
      setIsRenaming(true);
      return;
    }

    try {
      const updatedRecipe = {
        ...recipe.recipe,
        name: newName
      };

      const { error } = await supabase
        .from('public_recipes')
        .update({ recipe: updatedRecipe })
        .eq('id', recipe.id);

      if (error) throw error;
      
      setIsRenaming(false);
      window.location.reload();
    } catch (error) {
      console.error('Failed to rename recipe:', error);
    }
  };

  return (
    <>
      <div className="fuji-panel p-6 rounded-lg">
        <div className="flex gap-8">
          {/* Left side - Preview */}
          <div className="w-64 flex-shrink-0 space-y-4">
            <div 
              onClick={handlePreviewClick} 
              className="w-full aspect-[3/2] cursor-zoom-in rounded-lg overflow-hidden"
            >
              <RecipePreview
                recipe={recipe.recipe}
                imageUrl={recipe.preview_url || 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81'}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handlePreviewClick}
                className="flex-1 px-3 py-2 rounded-md text-sm font-medium bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
              >
                Preview
              </button>
              <button
                onClick={handleVoteClick}
                disabled={disabled}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium ${
                  isVoted
                    ? 'bg-[#b87a4b] text-white'
                    : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ThumbsUp className={`w-4 h-4 ${isVoted ? 'fill-white' : ''}`} />
                {recipe.votes}
              </button>
            </div>
          </div>

          {/* Right side - Recipe Details */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-[#b87a4b]" />
                {isRenaming ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-neutral-700 text-white px-2 py-1 rounded"
                    autoFocus
                  />
                ) : (
                  <h3 className="text-lg font-medium text-white">{recipe.recipe.name}</h3>
                )}
              </div>
              <div className="flex gap-2">
                {isOwner && (
                  <button
                    onClick={handleRename}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                  >
                    <Edit2 className="w-4 h-4" />
                    {isRenaming ? 'Save' : 'Rename'}
                  </button>
                )}
                <button
                  onClick={handleDownloadImage}
                  disabled={isProcessing}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                >
                  <Download className="w-4 h-4" />
                  {isProcessing ? 'Processing...' : 'Download Image'}
                </button>
                <button
                  onClick={handleDownloadRecipe}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                >
                  <FileText className="w-4 h-4" />
                  Recipe Card
                </button>
              </div>
            </div>

            {/* Recipe Settings */}
            <div className="grid grid-cols-2 gap-6" onClick={(e) => e.stopPropagation()}>
              {/* Base Settings */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-neutral-400">Base Settings</h3>
                <div className="bg-neutral-700/20 p-3 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-300">Film Simulation</span>
                    <span className="text-white font-medium">{recipe.recipe.filmSimulation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-300">Dynamic Range</span>
                    <span className="text-white font-medium">{recipe.recipe.dynamicRange}</span>
                  </div>
                </div>
              </div>

              {/* White Balance */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-neutral-400">White Balance</h3>
                <div className="bg-neutral-700/20 p-3 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-300">White Balance</span>
                    <span className="text-white font-medium flex items-center gap-1">
                      <WhiteBalanceIcon type={recipe.recipe.whiteBalance as any} className="w-4 h-4" />
                      {recipe.recipe.whiteBalance}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-300">WB Shift Red</span>
                    <span className="text-white font-medium">{recipe.recipe.whiteBalanceShift.red}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-300">WB Shift Blue</span>
                    <span className="text-white font-medium">{recipe.recipe.whiteBalanceShift.blue}</span>
                  </div>
                </div>
              </div>

              {/* Tone */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-neutral-400">Tone</h3>
                <div className="bg-neutral-700/20 p-3 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-300">Highlight</span>
                    <span className="text-white font-medium">{recipe.recipe.highlight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-300">Shadow</span>
                    <span className="text-white font-medium">{recipe.recipe.shadow}</span>
                  </div>
                </div>
              </div>

              {/* Color & Detail */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-neutral-400">Color & Detail</h3>
                <div className="bg-neutral-700/20 p-3 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-300">Color</span>
                    <span className="text-white font-medium">{recipe.recipe.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-300">Sharpness</span>
                    <span className="text-white font-medium">{recipe.recipe.sharpness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-300">Noise Reduction</span>
                    <span className="text-white font-medium">{recipe.recipe.noiseReduction}</span>
                  </div>
                </div>
              </div>

              {/* Grain */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-neutral-400">Grain</h3>
                <div className="bg-neutral-700/20 p-3 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-300">Grain Effect</span>
                    <span className="text-white font-medium">{recipe.recipe.grainEffect}</span>
                  </div>
                  {recipe.recipe.grainEffect !== 'Off' && (
                    <div className="flex justify-between">
                      <span className="text-neutral-300">Grain Size</span>
                      <span className="text-white font-medium">{recipe.recipe.grainSize}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Chrome Effects */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-neutral-400">Chrome Effects</h3>
                <div className="bg-neutral-700/20 p-3 rounded-md space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-300">Color Chrome Effect</span>
                    <span className="text-white font-medium">{recipe.recipe.chromeEffect}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-300">Color Chrome Blue</span>
                    <span className="text-white font-medium">{recipe.recipe.chromeBlueEffect}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPreview && (
        <PreviewImageModal
          recipe={recipe.recipe}
          imageUrl={recipe.preview_url || 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81'}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}