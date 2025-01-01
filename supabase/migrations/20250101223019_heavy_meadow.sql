/*
  # Drop Community Features

  1. Changes
    - Drop all community-related tables
    - Remove associated functions and policies
  
  2. Tables Dropped
    - public_recipes
    - recipe_votes
    - recipe_previews
    - recipe_collections
    - collection_recipes
*/

-- Drop views first
DROP VIEW IF EXISTS recipes_with_previews;

-- Drop functions
DROP FUNCTION IF EXISTS handle_vote;
DROP FUNCTION IF EXISTS get_recipe_preview;
DROP FUNCTION IF EXISTS update_recipe_preview;

-- Drop tables
DROP TABLE IF EXISTS recipe_previews CASCADE;
DROP TABLE IF EXISTS recipe_votes CASCADE;
DROP TABLE IF EXISTS collection_recipes CASCADE;
DROP TABLE IF EXISTS recipe_collections CASCADE;
DROP TABLE IF EXISTS public_recipes CASCADE;