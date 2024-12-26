import React, { useEffect, useState } from 'react';
import { Info } from 'lucide-react';
import * as exifr from 'exifr';

interface ExifData {
  Make?: string;
  Model?: string;
  FocalLength?: number;
  FNumber?: number;
  ExposureTime?: number;
  ISO?: number;
  DateTimeOriginal?: Date;
  LensModel?: string;
}

interface ExifPanelProps {
  imageUrl: string;
}

export function ExifPanel({ imageUrl }: ExifPanelProps) {
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExifData = async () => {
      setLoading(true);
      try {
        const exif = await exifr.parse(imageUrl, {
          pick: ['Make', 'Model', 'FocalLength', 'FNumber', 'ExposureTime', 'ISO', 'DateTimeOriginal', 'LensModel']
        });
        if (exif) {
          setExifData(exif);
        }
      } catch (error) {
        console.error('Failed to read EXIF data:', error);
      }
      setLoading(false);
    };

    loadExifData();
  }, [imageUrl]);

  if (loading) {
    return (
      <div className="p-4 bg-neutral-700/20 rounded-lg">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-neutral-400" />
          <span className="text-sm text-neutral-400">Reading image information...</span>
        </div>
      </div>
    );
  }

  if (!exifData || Object.keys(exifData).length === 0) {
    return (
      <div className="p-4 bg-neutral-700/20 rounded-lg">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-neutral-400" />
          <span className="text-sm text-neutral-400">No EXIF data available</span>
        </div>
      </div>
    );
  }

  const formatShutterSpeed = (time: number) => {
    return time < 1 ? `1/${Math.round(1/time)}s` : `${time}s`;
  };

  return (
    <div className="p-4 bg-neutral-700/20 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-4 h-4 text-neutral-400" />
        <span className="text-sm text-neutral-400">Image Information</span>
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {exifData.Make && exifData.Model && (
          <>
            <div className="text-neutral-400">Camera</div>
            <div className="text-white font-medium">{exifData.Make} {exifData.Model}</div>
          </>
        )}
        
        {exifData.LensModel && (
          <>
            <div className="text-neutral-400">Lens</div>
            <div className="text-white font-medium">{exifData.LensModel}</div>
          </>
        )}
        
        {exifData.FocalLength && (
          <>
            <div className="text-neutral-400">Focal Length</div>
            <div className="text-white font-medium">{Math.round(exifData.FocalLength)}mm</div>
          </>
        )}
        
        {exifData.FNumber && (
          <>
            <div className="text-neutral-400">Aperture</div>
            <div className="text-white font-medium">ƒ/{exifData.FNumber.toFixed(1)}</div>
          </>
        )}
        
        {exifData.ExposureTime && (
          <>
            <div className="text-neutral-400">Shutter Speed</div>
            <div className="text-white font-medium">{formatShutterSpeed(exifData.ExposureTime)}</div>
          </>
        )}
        
        {exifData.ISO && (
          <>
            <div className="text-neutral-400">ISO</div>
            <div className="text-white font-medium">ISO {exifData.ISO}</div>
          </>
        )}
        
        {exifData.DateTimeOriginal && (
          <>
            <div className="text-neutral-400">Date</div>
            <div className="text-white font-medium">
              {exifData.DateTimeOriginal.toLocaleDateString()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}