import { Recipe } from '../../types/Recipe';
import { generateXMPContent } from './xmp';

export const exportPreset = (recipe: Recipe) => {
  const xmpContent = generateXMPContent(recipe);
  const filename = `${recipe.name.toLowerCase().replace(/\s+/g, '-')}.xmp`;
  
  // Create and trigger download
  const blob = new Blob([xmpContent], { type: 'application/xmp' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};