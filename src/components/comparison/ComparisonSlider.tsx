import React, { useState, useRef, useEffect } from 'react';
import { Recipe } from '../../types/Recipe';
import { generateImageTransform } from '../../utils/colorScience/imageTransform';

interface ComparisonSliderProps {
  imageUrl: string;
  recipe: Recipe;
}

export function ComparisonSlider({ imageUrl, recipe }: ComparisonSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    handleMove(e.clientX);
  };

  const handleMoveEnd = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMoveEnd);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMoveEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMoveEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMoveEnd);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[3/2] overflow-hidden rounded-lg cursor-col-resize"
    >
      {/* Original Image (Full Width) */}
      <img
        src={imageUrl}
        alt="Original"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Processed Image (Right Side) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ left: `${position}%`, right: 0 }}
      >
        <img
          src={imageUrl}
          alt="Processed"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ 
            filter: generateImageTransform(recipe),
            left: `-${position}%`,
            width: '100vw'
          }}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize transform -translate-x-1/2"
        style={{ left: `${position}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={() => isDragging.current = true}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-4 h-0.5 bg-neutral-800 rounded-full" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-2 py-1 rounded">
        Original
      </div>
      <div className="absolute top-4 right-4 bg-black/50 text-white text-sm px-2 py-1 rounded">
        Processed
      </div>
    </div>
  );
}