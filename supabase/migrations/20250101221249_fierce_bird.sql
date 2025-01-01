-- Drop comments-related tables and views
DROP VIEW IF EXISTS comment_details;
DROP TABLE IF EXISTS recipe_comments;

-- Update recipe_collections to include recipe info
ALTER TABLE recipe_collections ADD COLUMN IF NOT EXISTS recipe_info jsonb;

-- Add index for recipe info
CREATE INDEX IF NOT EXISTS idx_recipe_collections_recipe_info ON recipe_collections USING gin(recipe_info);

-- Update collection_recipes to include metadata
ALTER TABLE collection_recipes 
ADD COLUMN IF NOT EXISTS notes text,
ADD COLUMN IF NOT EXISTS favorite boolean DEFAULT false;

-- Add RLS policy for recipe info
CREATE POLICY "Users can read recipe info"
  ON recipe_collections
  FOR SELECT
  TO authenticated
  USING (true);