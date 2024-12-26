import { Recipe } from '../types/Recipe';
import { generateImageTransform } from './colorScience/imageTransform';
import { calculateExportBorderWidth } from './borderCalculation';

export const downloadProcessedImage = async (imageUrl: string, recipe: Recipe) => {
  // Create canvas and load image
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Load image
  const img = new Image();
  img.crossOrigin = 'anonymous';
  
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = imageUrl;
  });

  // Calculate dimensions based on aspect ratio
  let targetWidth = img.width;
  let targetHeight = img.height;
  
  if (recipe.aspectRatio !== 'Original') {
    const ratios = {
      '3:2': 3/2,
      '16:9': 16/9,
      '1:1': 1
    };
    const targetRatio = ratios[recipe.aspectRatio];
    const currentRatio = img.width / img.height;

    if (currentRatio > targetRatio) {
      targetWidth = img.height * targetRatio;
    } else {
      targetHeight = img.width / targetRatio;
    }
  }

  // Add border to dimensions if enabled
  const borderWidth = recipe.border.enabled ? calculateExportBorderWidth(recipe.border.width) : 0;
  canvas.width = targetWidth + (borderWidth * 2);
  canvas.height = targetHeight + (borderWidth * 2);

  // Draw border if enabled
  if (recipe.border.enabled) {
    ctx.fillStyle = recipe.border.color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Calculate image position for centering
  const x = (canvas.width - targetWidth) / 2;
  const y = (canvas.height - targetHeight) / 2;

  // Apply filters and draw image
  ctx.filter = generateImageTransform(recipe);
  ctx.drawImage(img, 
    // Source rectangle (for cropping)
    (img.width - targetWidth) / 2, 
    (img.height - targetHeight) / 2, 
    targetWidth, 
    targetHeight,
    // Destination rectangle (with border offset)
    x, y, targetWidth, targetHeight
  );

  // Apply grain if enabled
  if (recipe.grainEffect !== 'Off') {
    const grainCanvas = document.createElement('canvas');
    const grainCtx = grainCanvas.getContext('2d');
    if (grainCtx) {
      grainCanvas.width = targetWidth;
      grainCanvas.height = targetHeight;
      
      const imageData = grainCtx.createImageData(targetWidth, targetHeight);
      const strength = recipe.grainEffect === 'Strong' ? 0.15 : 0.08;
      const size = recipe.grainSize === 'Large' ? 2 : 1;
      
      for (let i = 0; i < imageData.data.length; i += 4) {
        const noise = (Math.random() - 0.5) * strength * 255;
        for (let j = 0; j < size * 4; j += 4) {
          if (i + j < imageData.data.length) {
            imageData.data[i + j] = 
            imageData.data[i + j + 1] = 
            imageData.data[i + j + 2] = noise;
            imageData.data[i + j + 3] = 255;
          }
        }
      }
      
      grainCtx.putImageData(imageData, 0, 0);
      ctx.globalCompositeOperation = 'overlay';
      ctx.globalAlpha = 0.4;
      ctx.drawImage(grainCanvas, x, y);
    }
  }

  // Reset composite operation and alpha
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;

  // Download the image
  const link = document.createElement('a');
  link.download = `${recipe.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
  link.href = canvas.toDataURL('image/jpeg', 0.95);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};