/*
  # Add Community Features

  1. New Tables
    - `recipe_collections`: User-created collections of recipes
    - `collection_recipes`: Many-to-many relationship between collections and recipes
    - `recipe_comments`: User comments on recipes
    - `user_profiles`: Extended user information

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Recipe Collections
CREATE TABLE recipe_collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE collection_recipes (
  collection_id uuid REFERENCES recipe_collections ON DELETE CASCADE,
  recipe_id uuid REFERENCES public_recipes ON DELETE CASCADE,
  added_at timestamptz DEFAULT now(),
  PRIMARY KEY (collection_id, recipe_id)
);

-- Recipe Comments
CREATE TABLE recipe_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid REFERENCES public_recipes ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- User Profiles
CREATE TABLE user_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users,
  display_name text,
  bio text,
  website text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE recipe_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_recipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipe_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Collection Policies
CREATE POLICY "Users can view their own collections"
  ON recipe_collections
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create collections"
  ON recipe_collections
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their collections"
  ON recipe_collections
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their collections"
  ON recipe_collections
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Collection Recipes Policies
CREATE POLICY "Users can view collection recipes"
  ON collection_recipes
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM recipe_collections
      WHERE id = collection_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add recipes to collections"
  ON collection_recipes
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM recipe_collections
      WHERE id = collection_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can remove recipes from collections"
  ON collection_recipes
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM recipe_collections
      WHERE id = collection_id AND user_id = auth.uid()
    )
  );

-- Comment Policies
CREATE POLICY "Anyone can view comments"
  ON recipe_comments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create comments"
  ON recipe_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their comments"
  ON recipe_comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their comments"
  ON recipe_comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Profile Policies
CREATE POLICY "Anyone can view profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);