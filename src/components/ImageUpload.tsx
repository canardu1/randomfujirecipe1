import React from 'react';
import { Camera, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  onFileChange: (file: File) => void;
  error: string | null;
}

export function ImageUpload({ onFileChange, error }: ImageUploadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div className="w-full space-y-4">
      <span className="text-lg font-medium text-white">Upload a preview image</span>

      <div className="mt-3 w-full border-2 border-neutral-700 border-dashed rounded-lg hover:border-[#b87a4b] transition-colors bg-neutral-800/50">
        <div className="px-8 py-12 flex flex-col items-center">
          <Camera className="h-16 w-16 text-[#b87a4b]" />
          <div className="mt-4 flex flex-col items-center">
            <label htmlFor="file-upload" className="relative cursor-pointer fuji-accent text-lg hover:text-[#c98c5d] transition-colors">
              <span>Upload an image</span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
              />
            </label>
            <p className="mt-2 text-sm text-neutral-300">JPEG or PNG only</p>
          </div>
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-300">
              For best results:
            </p>
            <ul className="text-sm text-neutral-400 list-disc mt-2 space-y-1">
              <li>Use images with low contrast</li>
              <li>Use images with low saturation</li>
              <li>Avoid heavily edited photos</li>
            </ul>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mt-2 text-red-400 flex items-center gap-1 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}