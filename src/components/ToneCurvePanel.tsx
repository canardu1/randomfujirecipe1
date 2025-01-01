import React, { useEffect, useRef } from 'react';
import { LineChart } from 'lucide-react';
import { Recipe } from '../types/Recipe';
import { filmProfiles } from '../utils/colorScience/profiles';
import { getDefaultCurve } from '../utils/colorScience/curves';

interface ToneCurvePanelProps {
  recipe: Recipe;
}

export function ToneCurvePanel({ recipe }: ToneCurvePanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = '#262626';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = '#404040';
    ctx.lineWidth = 1;
    
    // Vertical and horizontal grid lines
    for (let i = 0; i <= 4; i++) {
      const pos = (i / 4) * canvas.width;
      ctx.beginPath();
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, canvas.height);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, pos);
      ctx.lineTo(canvas.width, pos);
      ctx.stroke();
    }

    // Get profile curves or default
    const profile = filmProfiles[recipe.filmSimulation];
    const curves = profile?.curves || {
      red: getDefaultCurve(),
      green: getDefaultCurve(),
      blue: getDefaultCurve()
    };

    // Draw curves
    const drawCurve = (points: [number, number][], color: string) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      points.forEach((point, i) => {
        const x = (point[0] / 255) * canvas.width;
        const y = canvas.height - (point[1] / 255) * canvas.height;
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // Use bezier curves for smooth interpolation
          const prevPoint = points[i - 1];
          const prevX = (prevPoint[0] / 255) * canvas.width;
          const prevY = canvas.height - (prevPoint[1] / 255) * canvas.height;
          
          const cp1x = prevX + (x - prevX) / 2;
          const cp2x = prevX + (x - prevX) / 2;
          
          ctx.bezierCurveTo(cp1x, prevY, cp2x, y, x, y);
        }
      });
      
      ctx.stroke();
    };

    // Draw RGB curves
    drawCurve(curves.red, '#ff6b6b');
    drawCurve(curves.green, '#51cf66');
    drawCurve(curves.blue, '#339af0');

  }, [recipe.filmSimulation]);

  return (
    <div className="p-4 bg-neutral-700/20 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <LineChart className="w-4 h-4 text-neutral-400" />
        <span className="text-sm text-neutral-400">Tone Curves</span>
      </div>
      <canvas
        ref={canvasRef}
        width={320}
        height={120}
        className="w-full rounded-md"
      />
    </div>
  );
}