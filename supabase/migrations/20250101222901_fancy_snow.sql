/*
  # Recipe Preview System Update

  1. Changes
    - Create recipe_previews table for storing preview images
    - Add RLS policies for security
    - Add helper function for preview management
  
  2. Security
    - Enable RLS on recipe_previews table
    - Add policies for reading and adding previews
*/

-- Create recipe_previews table with proper relationships
CREATE TABLE IF NOT EXISTS recipe_previews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid REFERENCES public_recipes(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE recipe_previews ENABLE ROW LEVEL SECURITY;

-- Add RLS policies
CREATE POLICY "Anyone can read recipe previews"
  ON recipe_previews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can add preview to their recipes"
  ON recipe_previews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public_recipes
      WHERE id = recipe_id
      AND user_id = auth.uid()
    )
  );

-- Create function to get latest preview
CREATE OR REPLACE FUNCTION get_recipe_preview(recipe_id uuid)
RETURNS text AS $$
  SELECT image_url
  FROM recipe_previews
  WHERE recipe_id = $1
  ORDER BY created_at DESC
  LIMIT 1;
$$ LANGUAGE sql;