-- Add preview_url column to public_recipes table
ALTER TABLE public_recipes ADD COLUMN IF NOT EXISTS preview_url text;

-- Drop old preview-related tables if they exist
DROP TABLE IF EXISTS recipe_previews CASCADE;

-- Update existing recipes to use a default preview image
UPDATE public_recipes 
SET preview_url = 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81'
WHERE preview_url IS NULL;