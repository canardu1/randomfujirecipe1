import { Recipe } from '../../types/Recipe';
import { generateImageTransform } from '../colorScience/imageTransform';
import { calculateWhiteBalanceTransform } from '../colorScience/whiteBalance';

// Size of the sample canvas (smaller is faster, but less accurate)
const SAMPLE_SIZE = 64;

export const processImageWithRecipe = async (recipe: Recipe): Promise<ImageData> => {
  // Create sample canvas
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('Could not get canvas context');

  canvas.width = SAMPLE_SIZE;
  canvas.height = SAMPLE_SIZE;

  // Create a gradient to sample from (full color range)
  const gradient = ctx.createLinearGradient(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  gradient.addColorStop(0, '#000000');
  gradient.addColorStop(0.5, '#808080');
  gradient.addColorStop(1, '#ffffff');

  // Draw gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

  // Apply film simulation filters
  ctx.filter = generateImageTransform(recipe);
  
  // Create temporary canvas for the filtered result
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = SAMPLE_SIZE;
  tempCanvas.height = SAMPLE_SIZE;
  const tempCtx = tempCanvas.getContext('2d');
  if (!tempCtx) throw new Error('Could not get temp canvas context');

  // Draw filtered image
  tempCtx.drawImage(canvas, 0, 0);

  // Apply white balance
  const wb = calculateWhiteBalanceTransform(recipe.whiteBalanceShift);
  if (wb.tempEffect.red || wb.tempEffect.blue) {
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = wb.tempEffect.red || wb.tempEffect.blue;
    ctx.fillRect(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  }

  // Add grain if enabled
  if (recipe.grainEffect !== 'Off') {
    const strength = recipe.grainEffect === 'Strong' ? 0.15 : 0.08;
    const size = recipe.grainSize === 'Large' ? 2 : 1;
    
    const imageData = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const noise = (Math.random() - 0.5) * strength * 255;
      for (let j = 0; j < size * 4; j += 4) {
        if (i + j < imageData.data.length) {
          imageData.data[i + j] += noise;
          imageData.data[i + j + 1] += noise;
          imageData.data[i + j + 2] += noise;
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }

  return ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
};