import React from 'react';
import { BarChart2 } from 'lucide-react';
import { Histogram } from './Histogram';

interface HistogramPanelProps {
  imageUrl: string;
}

export function HistogramPanel({ imageUrl }: HistogramPanelProps) {
  return (
    <div className="p-4 bg-neutral-700/20 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <BarChart2 className="w-4 h-4 text-neutral-400" />
        <span className="text-sm text-neutral-400">RGB Histogram</span>
      </div>
      <Histogram imageUrl={imageUrl} />
    </div>
  );
}