/*
  # Create saved recipes table

  1. New Tables
    - `saved_recipes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `recipe` (jsonb)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `saved_recipes` table
    - Add policies for authenticated users to manage their own recipes
*/

CREATE TABLE IF NOT EXISTS saved_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  recipe jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE saved_recipes ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own saved recipes
CREATE POLICY "Users can read own saved recipes"
  ON saved_recipes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Allow users to insert their own saved recipes
CREATE POLICY "Users can insert own saved recipes"
  ON saved_recipes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own saved recipes
CREATE POLICY "Users can delete own saved recipes"
  ON saved_recipes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);