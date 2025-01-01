-- Drop existing views and constraints
DROP VIEW IF EXISTS comment_details;
ALTER TABLE recipe_comments DROP CONSTRAINT IF EXISTS recipe_comments_user_id_fkey;

-- Ensure user_profiles table exists with correct structure
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for user_profiles
DROP POLICY IF EXISTS "Anyone can view profiles" ON user_profiles;
CREATE POLICY "Anyone can view profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Create or replace the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_profiles (id, display_name)
  VALUES (new.id, new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure recipe_comments table has correct structure
CREATE TABLE IF NOT EXISTS recipe_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id uuid REFERENCES public_recipes ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on recipe_comments
ALTER TABLE recipe_comments ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for recipe_comments
DROP POLICY IF EXISTS "Anyone can view comments" ON recipe_comments;
CREATE POLICY "Anyone can view comments"
  ON recipe_comments FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can create comments" ON recipe_comments;
CREATE POLICY "Users can create comments"
  ON recipe_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their comments" ON recipe_comments;
CREATE POLICY "Users can update their comments"
  ON recipe_comments FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their comments" ON recipe_comments;
CREATE POLICY "Users can delete their comments"
  ON recipe_comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create view for comment details with proper joins
CREATE OR REPLACE VIEW comment_details AS
SELECT 
  c.id,
  c.recipe_id,
  c.user_id,
  c.content,
  c.created_at,
  p.display_name,
  p.avatar_url
FROM recipe_comments c
LEFT JOIN user_profiles p ON c.user_id = p.id;

-- Grant access to the view
GRANT SELECT ON comment_details TO authenticated;

-- Ensure existing users have profiles
INSERT INTO user_profiles (id, display_name)
SELECT id, email 
FROM auth.users
WHERE id NOT IN (SELECT id FROM user_profiles)
ON CONFLICT (id) DO NOTHING;