import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Recipe } from '../types/Recipe';
import { useAuth } from '../hooks/useAuth';
import { CommunityHeader } from '../components/community/CommunityHeader';
import { CommunityInstructions } from '../components/community/CommunityInstructions';
import { RecipeGrid } from '../components/community/RecipeGrid';
import { RecipeModal } from '../components/community/RecipeModal';
import { useVotes } from '../hooks/useVotes';
import { ImageUploadPanel } from '../components/community/ImageUploadPanel';

interface PublicRecipe {
  id: string;
  recipe: Recipe;
  votes: number;
  preview_url?: string;
  user_id: string;
  created_at: string;
}

export function CommunityRecipes() {
  const [recipes, setRecipes] = useState<PublicRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'votes' | 'newest'>('votes');
  const [selectedRecipe, setSelectedRecipe] = useState<PublicRecipe | null>(null);
  const [sharedImage, setSharedImage] = useState<string | null>(null);
  const { user } = useAuth();
  const { userVotes, handleVote, loading: votesLoading, error: votesError } = useVotes();

  useEffect(() => {
    fetchRecipes();
  }, [sortBy]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('public_recipes')
        .select(`
          *,
          recipe_previews (
            image_url
          )
        `);

      if (sortBy === 'votes') {
        query = query.order('votes', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;

      setRecipes(data?.map(recipe => ({
        ...recipe,
        preview_url: recipe.recipe_previews?.[0]?.image_url
      })) || []);
    } catch (err) {
      console.error('Error fetching recipes:', err);
      setError('Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  const handleVoteClick = async (recipeId: string) => {
    if (!user) return;
    await handleVote(recipeId);
    await fetchRecipes();
  };

  const handleImageUpload = (url: string) => {
    setSharedImage(url);
  };

  const handleImageClear = () => {
    setSharedImage(null);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-neutral-400">Loading recipes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <CommunityHeader 
        sortBy={sortBy} 
        onSortChange={setSortBy}
      />

      <CommunityInstructions />

      {user && (
        <ImageUploadPanel 
          onImageUpload={handleImageUpload}
          onClear={handleImageClear}
          currentImage={sharedImage}
        />
      )}

      {votesError && (
        <div className="mb-4 text-red-400 text-sm">{votesError}</div>
      )}

      <div className="grid grid-cols-1 gap-6">
        <RecipeGrid
          recipes={recipes.map(recipe => ({
            ...recipe,
            preview_url: sharedImage || recipe.preview_url
          }))}
          onRecipeClick={(id) => setSelectedRecipe(recipes.find(r => r.id === id) || null)}
          onVote={handleVoteClick}
          userVotes={userVotes}
          currentUserId={user?.id}
        />
      </div>

      {selectedRecipe && (
        <RecipeModal
          recipe={{
            ...selectedRecipe,
            preview_url: sharedImage || selectedRecipe.preview_url
          }}
          isVoted={userVotes.has(selectedRecipe.id)}
          onVote={handleVoteClick}
          onClose={() => setSelectedRecipe(null)}
          currentUserId={user?.id}
        />
      )}

      {recipes.length === 0 && (
        <div className="text-center py-12 text-neutral-400">
          No recipes have been shared yet.
        </div>
      )}
    </div>
  );
}