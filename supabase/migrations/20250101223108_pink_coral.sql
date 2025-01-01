/*
  # Create Community Features

  1. Tables Created
    - public_recipes: Stores shared recipes
    - recipe_votes: Tracks user votes
    - recipe_previews: Stores preview images
  
  2. Security
    - RLS enabled on all tables
    - Policies for authenticated users
*/

-- Public recipes table
CREATE TABLE public_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  recipe jsonb NOT NULL,
  votes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  last_modified timestamptz DEFAULT now()
);

-- Recipe votes table
CREATE TABLE recipe_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  recipe_id uuid REFERENCES public_recipes NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, recipe_id)
);

-- Recipe previews table
CREATE TABLE recipe_previews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid REFERENCES public_recipes ON DELETE CASCADE,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_previews ENABLE ROW LEVEL SECURITY;

-- Policies for public_recipes
CREATE POLICY "Anyone can read public recipes"
  ON public_recipes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can publish their recipes"
  ON public_recipes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their recipes"
  ON public_recipes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for recipe_votes
CREATE POLICY "Users can see all votes"
  ON recipe_votes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can vote once per recipe"
  ON recipe_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their votes"
  ON recipe_votes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for recipe_previews
CREATE POLICY "Anyone can read recipe previews"
  ON recipe_previews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can add preview to their recipes"
  ON recipe_previews FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public_recipes
      WHERE id = recipe_id
      AND user_id = auth.uid()
    )
  );

-- Function to handle voting
CREATE OR REPLACE FUNCTION handle_vote(
  p_user_id uuid,
  p_recipe_id uuid,
  p_action text
) RETURNS void AS $$
BEGIN
  IF p_action = 'add' THEN
    INSERT INTO recipe_votes (user_id, recipe_id)
    VALUES (p_user_id, p_recipe_id);
    
    UPDATE public_recipes
    SET votes = votes + 1
    WHERE id = p_recipe_id;
  ELSIF p_action = 'remove' THEN
    DELETE FROM recipe_votes
    WHERE user_id = p_user_id AND recipe_id = p_recipe_id;
    
    UPDATE public_recipes
    SET votes = GREATEST(0, votes - 1)
    WHERE id = p_recipe_id;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;