import React from 'react';
import { Recipe } from '../../types/Recipe';
import { generateImageTransform } from '../../utils/colorScience/imageTransform';
import { calculatePreviewBorderWidth } from '../../utils/borderCalculation';

type GuideType = 'rule-of-thirds' | 'golden-ratio' | 'golden-spiral' | 'dynamic-symmetry' | 'center';

interface CompositionGuideProps {
  imageUrl: string;
  recipe: Recipe;
  guideType: GuideType | null;
  showProcessed: boolean;
}

export function CompositionGuide({ imageUrl, recipe, guideType, showProcessed }: CompositionGuideProps) {
  const getContainerStyle = () => {
    const style: React.CSSProperties = {
      position: 'relative',
      width: '100%'
    };

    if (recipe.aspectRatio !== 'Original') {
      const ratios = {
        '3:2': 'calc(100% * 2/3)',
        '16:9': 'calc(100% * 9/16)',
        '1:1': '100%'
      };
      style.paddingTop = ratios[recipe.aspectRatio];
    } else {
      style.aspectRatio = '3/2';
    }

    return style;
  };

  const getImageWrapperStyle = () => {
    const style: React.CSSProperties = {
      position: recipe.aspectRatio === 'Original' ? 'relative' : 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden'
    };

    if (recipe.border.enabled) {
      const previewBorderWidth = calculatePreviewBorderWidth(recipe.border.width);
      style.padding = `${previewBorderWidth}px`;
      style.backgroundColor = recipe.border.color;
    }

    return style;
  };

  const renderGuideOverlay = () => {
    if (!guideType) return null;

    const guides = {
      'rule-of-thirds': (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/3 top-0 w-px h-full bg-white/30" />
          <div className="absolute left-2/3 top-0 w-px h-full bg-white/30" />
          <div className="absolute top-1/3 left-0 w-full h-px bg-white/30" />
          <div className="absolute top-2/3 left-0 w-full h-px bg-white/30" />
        </div>
      ),
      'golden-ratio': (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[38.2%] top-0 w-px h-full bg-white/30" />
          <div className="absolute left-[61.8%] top-0 w-px h-full bg-white/30" />
          <div className="absolute top-[38.2%] left-0 w-full h-px bg-white/30" />
          <div className="absolute top-[61.8%] left-0 w-full h-px bg-white/30" />
        </div>
      ),
      'golden-spiral': (
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
            {/* Golden spiral path using precise Fibonacci proportions */}
            <path d="
              M 1000,1000
              h -618 v -618
              h 382 v 382
              h -236 v -236
              h 146 v 146
              h -90 v -90
              h 56 v 56
              h -35 v -35
              a 35,35 0 0 1 35,-35
              a 56,56 0 0 0 56,56
              a 90,90 0 0 1 -90,90
              a 146,146 0 0 0 146,-146
              a 236,236 0 0 1 -236,236
              a 382,382 0 0 0 382,-382
              a 618,618 0 0 1 -618,618
              a 1000,1000 0 0 0 1000,-1000
            " fill="none"/>
          </svg>
        </div>
      ),
      'dynamic-symmetry': (
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
            {/* Root 4 Rectangle Dynamic Symmetry */}
            <path d="M0,0 L1000,1000" />
            <path d="M1000,0 L0,1000" />
            <path d="M500,0 L1000,500 L500,1000 L0,500 Z" />
            <path d="M0,250 L750,1000" />
            <path d="M0,750 L250,1000" />
            <path d="M750,0 L1000,250" />
            <path d="M250,0 L1000,750" />
            {/* Horizontal and vertical divisions */}
            <path d="M0,500 L1000,500" />
            <path d="M500,0 L500,1000" />
          </svg>
        </div>
      ),
      'center': (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-24 h-24 border-2 border-white/30 rounded-full" />
          <div className="absolute w-px h-full bg-white/30" />
          <div className="absolute w-full h-px bg-white/30" />
        </div>
      )
    } as const;

    return guides[guideType] || null;
  };

  return (
    <div style={getContainerStyle()}>
      <div style={getImageWrapperStyle()}>
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-full object-cover"
          style={showProcessed ? { filter: generateImageTransform(recipe) } : undefined}
        />
        {renderGuideOverlay()}
      </div>
    </div>
  );
}