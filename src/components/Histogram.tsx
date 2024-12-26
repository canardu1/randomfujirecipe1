import React, { useEffect, useRef } from 'react';

interface HistogramProps {
  imageUrl: string;
  className?: string;
}

export function Histogram({ imageUrl, className = '' }: HistogramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      // Create temporary canvas for image processing
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;

      // Set temp canvas size and draw image
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      tempCtx.drawImage(img, 0, 0);

      // Get image data
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const data = imageData.data;

      // Initialize histogram data
      const histogramR = new Array(256).fill(0);
      const histogramG = new Array(256).fill(0);
      const histogramB = new Array(256).fill(0);
      const histogramL = new Array(256).fill(0);

      // Calculate histogram
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Calculate luminance
        const l = Math.round(0.2126 * r + 0.7152 * g + 0.0722 * b);
        
        histogramR[r]++;
        histogramG[g]++;
        histogramB[b]++;
        histogramL[l]++;
      }

      // Find maximum value for scaling
      const maxValue = Math.max(
        ...histogramR,
        ...histogramG,
        ...histogramB,
        ...histogramL
      );

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background
      ctx.fillStyle = '#262626';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = '#404040';
      ctx.lineWidth = 1;
      
      // Vertical grid lines
      for (let i = 0; i <= 4; i++) {
        const x = (i / 4) * canvas.width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw channels
      const drawChannel = (data: number[], color: string, alpha: number = 0.8) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.globalAlpha = alpha;

        for (let i = 0; i < 256; i++) {
          const x = (i / 255) * canvas.width;
          const y = canvas.height - (data[i] / maxValue) * canvas.height;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      };

      // Draw luminance first (as background)
      drawChannel(histogramL, '#ffffff', 0.2);
      
      // Draw RGB channels
      drawChannel(histogramR, '#ff6b6b');
      drawChannel(histogramG, '#51cf66');
      drawChannel(histogramB, '#339af0');

      // Reset alpha
      ctx.globalAlpha = 1;
    };
  }, [imageUrl]);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={120}
      className={`w-full rounded-md ${className}`}
    />
  );
}