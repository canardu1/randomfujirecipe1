import React, { useState } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { isValidPreviewFile } from '../../utils/fileValidation';

interface PreviewUploadProps {
  recipeId: string;
  onSuccess: (imageUrl: string) => void;
  onClose: () => void;
}

export function PreviewUpload({ recipeId, onSuccess, onClose }: PreviewUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isValidPreviewFile(file)) {
      setError('Please upload a JPEG or PNG file');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      // Upload to Storage
      const filename = `${recipeId}-${Date.now()}.${file.name.split('.').pop()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('recipe-previews')
        .upload(filename, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('recipe-previews')
        .getPublicUrl(filename);

      // Save preview in database
      const { error: dbError } = await supabase
        .from('recipe_previews')
        .insert([{
          recipe_id: recipeId,
          image_url: publicUrl
        }]);

      if (dbError) throw dbError;

      onSuccess(publicUrl);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-800 rounded-lg w-full max-w-md">
        <div className="p-4 border-b border-neutral-700 flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Upload Preview Image</h3>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="border-2 border-dashed border-neutral-700 rounded-lg hover:border-[#b87a4b] transition-colors">
            <label className="block p-8 cursor-pointer">
              <div className="flex flex-col items-center">
                <Image className="w-12 h-12 text-[#b87a4b] mb-4" />
                <span className="text-neutral-300 mb-2">
                  {uploading ? 'Uploading...' : 'Click to upload a preview image'}
                </span>
                <span className="text-sm text-neutral-500">JPEG or PNG only</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                  disabled={uploading}
                />
              </div>
            </label>
          </div>

          {error && (
            <div className="mt-4 text-red-400 text-sm flex items-center gap-1">
              <X className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}