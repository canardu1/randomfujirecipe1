import React from 'react';
import { Heart, Camera, Sliders, Download, Image } from 'lucide-react';

export function WelcomePanel() {
  return (
    <div className="space-y-6">
      <div className="fuji-panel p-6 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Welcome to Fujifilm Recipe Generator</h2>
        <p className="text-neutral-300 mb-6">
          Create beautiful Fujifilm-inspired looks for your photos with our recipe generator.
          Upload an image to get started!
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-neutral-700/30 rounded-lg">
              <Image className="w-5 h-5 text-[#b87a4b]" />
            </div>
            <div>
              <h3 className="text-white font-medium">Upload Your Photo</h3>
              <p className="text-sm text-neutral-400">Start by uploading any JPEG or PNG image</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-neutral-700/30 rounded-lg">
              <Camera className="w-5 h-5 text-[#b87a4b]" />
            </div>
            <div>
              <h3 className="text-white font-medium">Generate Recipe</h3>
              <p className="text-sm text-neutral-400">Get a randomly generated Fujifilm simulation recipe</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-neutral-700/30 rounded-lg">
              <Sliders className="w-5 h-5 text-[#b87a4b]" />
            </div>
            <div>
              <h3 className="text-white font-medium">Customize</h3>
              <p className="text-sm text-neutral-400">Fine-tune the recipe to match your vision</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-neutral-700/30 rounded-lg">
              <Download className="w-5 h-5 text-[#b87a4b]" />
            </div>
            <div>
              <h3 className="text-white font-medium">Download</h3>
              <p className="text-sm text-neutral-400">Save your processed image with the recipe applied</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fuji-panel p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Support the Project</h3>
          <Heart className="w-5 h-5 text-[#b87a4b]" />
        </div>
        <p className="text-neutral-300 mt-2 mb-4">
          If you find this tool useful, consider supporting its development!
        </p>
        <a
          href="https://paypal.me/canardu"
          target="_blank"
          rel="noopener noreferrer"
          className="fuji-button w-full px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2"
        >
          <Heart className="w-4 h-4" />
          Support via PayPal
        </a>
      </div>
    </div>
  );
}