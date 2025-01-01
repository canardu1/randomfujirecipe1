/*
  # Create vote increment/decrement functions

  1. New Functions
    - increment_votes: Increment vote count for a recipe
    - decrement_votes: Decrement vote count for a recipe
*/

-- Function to increment votes
CREATE OR REPLACE FUNCTION increment_votes(recipe_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public_recipes
  SET votes = votes + 1
  WHERE id = recipe_id;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement votes
CREATE OR REPLACE FUNCTION decrement_votes(recipe_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE public_recipes
  SET votes = GREATEST(0, votes - 1)
  WHERE id = recipe_id;
END;
$$ LANGUAGE plpgsql;