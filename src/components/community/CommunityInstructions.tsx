import React from 'react';
import { Camera, Upload, ThumbsUp, Download } from 'lucide-react';

export function CommunityInstructions() {
  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6 mb-6">
      <h2 className="text-lg font-medium text-white mb-4">How It Works</h2>
      
      <div className="grid gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-neutral-700/30 rounded-lg">
            <Upload className="w-5 h-5 text-[#b87a4b]" />
          </div>
          <div>
            <h3 className="text-white font-medium">Upload a Preview</h3>
            <p className="text-sm text-neutral-400">Share a preview image to showcase your recipe's look</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-neutral-700/30 rounded-lg">
            <Camera className="w-5 h-5 text-[#b87a4b]" />
          </div>
          <div>
            <h3 className="text-white font-medium">Try Different Recipes</h3>
            <p className="text-sm text-neutral-400">Click on any recipe to see its settings and preview</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-neutral-700/30 rounded-lg">
            <Download className="w-5 h-5 text-[#b87a4b]" />
          </div>
          <div>
            <h3 className="text-white font-medium">Download Processed Images</h3>
            <p className="text-sm text-neutral-400">Download images with the recipe's look applied</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-neutral-700/30 rounded-lg">
            <ThumbsUp className="w-5 h-5 text-[#b87a4b]" />
          </div>
          <div>
            <h3 className="text-white font-medium">Vote for Your Favorites</h3>
            <p className="text-sm text-neutral-400">Help the community discover the best recipes</p>
          </div>
        </div>
      </div>
    </div>
  );
}