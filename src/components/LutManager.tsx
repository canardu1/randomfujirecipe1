import React, { useState } from 'react';
import { Upload, Check, AlertCircle, ArrowLeft } from 'lucide-react';
import { FilmSimulation, LutFormat } from '../luts/types';
import { filmSimulations } from '../data/recipes';
import { isValidLutFile, getLutFormat } from '../utils/lutValidation';
import { parseLut } from '../utils/lutParsers';
import { lutStore } from '../store/lutStore';

interface LutUploadState {
  simulation: FilmSimulation;
  file: File | null;
  uploaded: boolean;
  format?: LutFormat;
  error?: string;
}

interface LutManagerProps {
  onBack: () => void;
}

export function LutManager({ onBack }: LutManagerProps) {
  const [uploads, setUploads] = useState<Record<FilmSimulation, LutUploadState>>(() => 
    filmSimulations.reduce((acc, sim) => ({
      ...acc,
      [sim]: { simulation: sim as FilmSimulation, file: null, uploaded: false }
    }), {} as Record<FilmSimulation, LutUploadState>)
  );

  const handleFileChange = async (simulation: FilmSimulation, file: File | null) => {
    if (!file) return;

    if (!isValidLutFile(file)) {
      setUploads(prev => ({
        ...prev,
        [simulation]: {
          ...prev[simulation],
          error: 'Please upload a .cube or .3dl LUT file',
          file: null,
          uploaded: false,
          format: undefined
        }
      }));
      return;
    }

    const format = getLutFormat(file.name);
    if (!format) return;

    try {
      // Parse the LUT file
      await parseLut(file, format);

      // Store the LUT
      lutStore.addLut(simulation, file, format);

      // Update UI state
      setUploads(prev => ({
        ...prev,
        [simulation]: {
          simulation,
          file,
          format,
          uploaded: true,
          error: undefined
        }
      }));
    } catch (err) {
      setUploads(prev => ({
        ...prev,
        [simulation]: {
          ...prev[simulation],
          error: 'Failed to parse LUT file. Please check the file format.',
          file: null,
          uploaded: false,
          format: undefined
        }
      }));
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <h2 className="text-xl font-bold text-gray-800">LUT Management</h2>
      </div>
      <p className="text-sm text-gray-600 mb-6">
        Upload .cube or .3dl LUT files for each film simulation
      </p>
      <div className="space-y-4">
        {filmSimulations.map((simulation) => {
          const upload = uploads[simulation];
          
          return (
            <div key={simulation} className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{simulation}</span>
                <div className="flex items-center gap-2">
                  {upload.uploaded && (
                    <span className="flex items-center text-green-600 text-sm">
                      <Check className="w-4 h-4 mr-1" />
                      Uploaded ({upload.format})
                    </span>
                  )}
                  <label className="cursor-pointer inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <Upload className="w-4 h-4 mr-1" />
                    {upload.uploaded ? 'Replace' : 'Upload LUT'}
                    <input
                      type="file"
                      className="sr-only"
                      accept=".cube,.3dl"
                      onChange={(e) => handleFileChange(simulation as FilmSimulation, e.target.files?.[0] || null)}
                    />
                  </label>
                </div>
              </div>
              {upload.error && (
                <div className="mt-2 text-red-600 flex items-center gap-1 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {upload.error}
                </div>
              )}
              {upload.file && (
                <div className="mt-2 text-sm text-gray-500">
                  File: {upload.file.name}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}