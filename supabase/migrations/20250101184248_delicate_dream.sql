/*
  # Add Preview Images Support

  1. New Tables
    - `recipe_previews`
      - `id` (uuid, primary key)
      - `recipe_id` (uuid, references public_recipes)
      - `image_url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS
    - Add policies for read/write access
*/

-- Create recipe previews table
CREATE TABLE IF NOT EXISTS recipe_previews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid REFERENCES public_recipes ON DELETE CASCADE,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE recipe_previews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read preview images
CREATE POLICY "Anyone can read recipe previews"
  ON recipe_previews
  FOR SELECT
  USING (true);

-- Allow authenticated users to add preview images to their recipes
CREATE POLICY "Users can add preview images to their recipes"
  ON recipe_previews
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public_recipes
      WHERE public_recipes.id = recipe_id
      AND public_recipes.user_id = auth.uid()
    )
  );