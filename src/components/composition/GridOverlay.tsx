import React from 'react';

export function GridOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="w-full h-full grid grid-cols-3 grid-rows-3">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`bg-white/30 ${i < 2 ? 'w-px h-full' : 'w-full h-px'} ${
              i < 2 ? 'col-start-' + (i + 2) + ' col-span-1 row-span-full' :
              'row-start-' + (i - 1) + ' row-span-1 col-span-full'
            }`}
          />
        ))}
      </div>
    </div>
  );
}