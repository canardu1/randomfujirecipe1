import { Recipe } from '../types/Recipe';

export const shareToInstagram = async (imageUrl: string, recipe: Recipe) => {
  try {
    // Create a blob from the processed image
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Create a File object from the blob
    const file = new File([blob], 'fujifilm-recipe.jpg', { type: 'image/jpeg' });

    // Create caption text
    const caption = `Shot with ${recipe.name} recipe\n\n` +
      `Film Simulation: ${recipe.filmSimulation}\n` +
      `#fujifilm #photography #filmrecipe`;

    // Check if the Web Share API is available and supports sharing files
    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: recipe.name,
        text: caption
      });
    } else {
      // Fallback for browsers that don't support file sharing
      const instagramUrl = `https://www.instagram.com/create/select`;
      window.open(instagramUrl, '_blank');
    }
  } catch (error) {
    console.error('Error sharing to Instagram:', error);
    // Fallback to opening Instagram
    window.open('https://www.instagram.com', '_blank');
  }
};