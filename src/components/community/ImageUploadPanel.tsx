import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { isValidPreviewFile } from '../../utils/fileValidation';

interface ImageUploadPanelProps {
  onImageUpload: (url: string) => void;
  onClear: () => void;
  currentImage: string | null;
}

export function ImageUploadPanel({ onImageUpload, onClear, currentImage }: ImageUploadPanelProps) {
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isValidPreviewFile(file)) {
      setError('Please upload a JPEG or PNG file');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      onImageUpload(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-neutral-300">Preview Image</h3>
        {currentImage && (
          <button
            onClick={onClear}
            className="text-neutral-400 hover:text-white flex items-center gap-1 text-sm"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <label className="block border-2 border-dashed border-neutral-700 rounded-lg hover:border-[#b87a4b] transition-colors cursor-pointer">
        <div className="flex items-center justify-center gap-2 p-4">
          <Camera className="w-5 h-5 text-[#b87a4b]" />
          <span className="text-sm text-neutral-300">
            {currentImage ? 'Change preview image' : 'Upload preview image'}
          </span>
          <input
            type="file"
            className="hidden"
            accept="image/jpeg,image/png"
            onChange={handleFileChange}
          />
        </div>
      </label>

      {error && (
        <div className="mt-2 text-red-400 text-sm flex items-center gap-1">
          <X className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}