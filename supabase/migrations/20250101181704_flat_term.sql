/*
  # Create community recipes tables

  1. New Tables
    - `public_recipes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `recipe` (jsonb)
      - `votes` (int)
      - `created_at` (timestamp)
    - `recipe_votes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `recipe_id` (uuid, references public_recipes)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Public recipes table
CREATE TABLE IF NOT EXISTS public_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  recipe jsonb NOT NULL,
  votes int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Recipe votes table for tracking user votes
CREATE TABLE IF NOT EXISTS recipe_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  recipe_id uuid REFERENCES public_recipes NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

-- Enable RLS
ALTER TABLE public_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_votes ENABLE ROW LEVEL SECURITY;

-- Policies for public_recipes
CREATE POLICY "Anyone can read public recipes"
  ON public_recipes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can publish their recipes"
  ON public_recipes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for recipe_votes
CREATE POLICY "Users can see all votes"
  ON recipe_votes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can vote once per recipe"
  ON recipe_votes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their votes"
  ON recipe_votes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);