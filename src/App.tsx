import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Recipe } from './types/Recipe';
import { generateRandomRecipe } from './data/recipes';
import { RecipeDisplay } from './components/RecipeDisplay';
import { ImagePreview } from './components/ImagePreview';
import { RecipeControls } from './components/RecipeControls';
import { ImageControls } from './components/ImageControls';
import { ImageUpload } from './components/ImageUpload';
import { WelcomePanel } from './components/WelcomePanel';
import { Footer } from './components/Footer';
import { isValidPreviewFile } from './utils/fileValidation';

export default function App() {
  const [preview, setPreview] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        setRecipe(generateRandomRecipe());
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRecipeChange = (newRecipe: Recipe) => {
    setRecipe(newRecipe);
  };

  const generateNewRecipe = () => {
    setRecipe(generateRandomRecipe());
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900">
      <header className="bg-neutral-800 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center">
          <div className="flex items-center space-x-2">
            <Camera className="w-8 h-8 text-[#b87a4b]" />
            <h1 className="text-2xl font-bold text-white">Fujifilm Recipe Generator</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Left Panel */}
          <div className="space-y-6 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
            <ImageUpload 
              onFileChange={handleFileChange} 
              error={error}
            />
            {preview && recipe && (
              <ImagePreview 
                imageUrl={preview} 
                recipe={recipe} 
                onGenerateRecipe={generateNewRecipe}
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
      </main>

      <Footer />
    </div>
  );
}