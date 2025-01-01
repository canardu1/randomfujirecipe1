import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Recipe } from '../types/Recipe';

export function useSavedRecipes(userId: string | undefined) {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setSavedRecipes([]);
      setLoading(false);
      return;
    }

    const fetchSavedRecipes = async () => {
      const { data, error } = await supabase
        .from('saved_recipes')
        .select('recipe')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching saved recipes:', error);
        return;
      }

      setSavedRecipes(data.map(item => item.recipe));
      setLoading(false);
    };

    fetchSavedRecipes();
  }, [userId]);

  const saveRecipe = async (recipe: Recipe) => {
    if (!userId) return;

    const { error } = await supabase
      .from('saved_recipes')
      .insert([{ user_id: userId, recipe }]);

    if (error) {
      console.error('Error saving recipe:', error);
      return;
    }

    setSavedRecipes([...savedRecipes, recipe]);
  };

  const removeRecipe = async (recipe: Recipe) => {
    if (!userId) return;

    const { error } = await supabase
      .from('saved_recipes')
      .delete()
      .eq('user_id', userId)
      .eq('recipe->name', recipe.name);

    if (error) {
      console.error('Error removing recipe:', error);
      return;
    }

    setSavedRecipes(savedRecipes.filter(r => r.name !== recipe.name));
  };

  return {
    savedRecipes,
    loading,
    saveRecipe,
    removeRecipe,
    isSaved: (recipe: Recipe) => savedRecipes.some(r => r.name === recipe.name)
  };
}