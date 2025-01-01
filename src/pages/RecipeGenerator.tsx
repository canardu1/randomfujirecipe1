import React, { useState } from 'react';
import { Recipe } from '../types/Recipe';
import { generateRandomRecipe } from '../utils/recipeGeneration';
import { RecipeDisplay } from '../components/RecipeDisplay';
import { ImagePreview } from '../components/ImagePreview';
import { RecipeControls } from '../components/RecipeControls';
import { ImageControls } from '../components/ImageControls';
import { ImageUpload } from '../components/ImageUpload';
import { WelcomePanel } from '../components/WelcomePanel';
import { FilmSimulationCategories } from '../components/FilmSimulationCategories';
import { isValidPreviewFile } from '../utils/fileValidation';

interface RecipeGeneratorProps {
  user: any | null;
}

export function RecipeGenerator({ user }: RecipeGeneratorProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['fujifilm']);

  const handleFileChange = (file: File) => {
    setError(null);
    
    if (!isValidPreviewFile(file)) {
      setError('Please upload a JPEG or PNG file for preview');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      if (!recipe) {
        setRecipe(generateRandomRecipe(selectedCategories));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRecipeChange = (newRecipe: Recipe) => {
    setRecipe(newRecipe);
  };

  const generateNewRecipe = () => {
    setRecipe(generateRandomRecipe(selectedCategories));
  };

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Left Panel */}
        <div className="space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
          <ImageUpload 
            onFileChange={handleFileChange} 
            error={error}
          />
          <div className="fuji-panel p-6 rounded-lg">
            <FilmSimulationCategories
              selectedCategories={selectedCategories}
              onChange={setSelectedCategories}
            />
          </div>
          {preview && recipe && (
            <ImagePreview 
              imageUrl={preview} 
              recipe={recipe} 
              onGenerateRecipe={generateNewRecipe}
              userId={user?.id}
            />
          )}
        </div>

        {/* Right Panel */}
        <div className="space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
          {recipe ? (
            <>
              <RecipeDisplay recipe={recipe} imageUrl={preview!} />
              <ImageControls recipe={recipe} onChange={handleRecipeChange} />
              <div className="fuji-panel p-6 rounded-lg">
                <RecipeControls recipe={recipe} onChange={handleRecipeChange} />
              </div>
            </>
          ) : (
            <WelcomePanel />
          )}
        </div>
      </div>
    </div>
  );
}