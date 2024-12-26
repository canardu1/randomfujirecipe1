import React, { useState } from 'react';
import { Download, Eye, RefreshCw } from 'lucide-react';
import { Recipe } from '../types/Recipe';
import { generateImageTransform } from '../utils/colorScience/imageTransform';
import { downloadProcessedImage } from '../utils/imageProcessing';
import { CompositionControls } from './composition/CompositionControls';
import { CompositionGuide } from './composition/CompositionGuide';

interface ImagePreviewProps {
  imageUrl: string;
  recipe: Recipe;
  onGenerateRecipe: () => void;
}

export function ImagePreview({ imageUrl, recipe, onGenerateRecipe }: ImagePreviewProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showProcessed, setShowProcessed] = useState(true);
  const [guide, setGuide] = useState<'rule-of-thirds' | 'golden-ratio' | 'center' | null>(null);

  const handleDownload = async () => {
    setIsProcessing(true);
    try {
      await downloadProcessedImage(imageUrl, recipe);
    } catch (error) {
      console.error('Failed to process image:', error);
    }
    setIsProcessing(false);
  };

  return (
    <div className="fuji-panel rounded-lg space-y-6">
      {/* Controls */}
      <div className="px-6 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowProcessed(!showProcessed)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm ${
              showProcessed
                ? 'bg-[#b87a4b] text-white'
                : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
            }`}
          >
            <Eye className="w-4 h-4" />
            {showProcessed ? 'Show Original' : 'Show Processed'}
          </button>

          <button
            onClick={onGenerateRecipe}
            className="fuji-button px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            Generate Recipe
          </button>
        </div>

        <button
          onClick={handleDownload}
          disabled={isProcessing}
          className="fuji-button px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-1"
        >
          <Download className="w-4 h-4" />
          {isProcessing ? 'Processing...' : 'Download'}
        </button>
      </div>

      {/* Image Container */}
      <div className="px-6">
        <div className="relative w-full overflow-hidden rounded-lg">
          <CompositionGuide 
            imageUrl={imageUrl} 
            recipe={recipe}
            guideType={guide}
            showProcessed={showProcessed}
          />
        </div>
      </div>

      {/* Composition Controls */}
      <div className="px-6 pb-6 flex justify-center">
        <CompositionControls 
          guide={guide} 
          onGuideChange={setGuide} 
        />
      </div>
    </div>
  );
}