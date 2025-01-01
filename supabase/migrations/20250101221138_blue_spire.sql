-- Drop existing view if exists
DROP VIEW IF EXISTS comment_details;

-- Ensure user_profiles table exists with correct structure
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on user_profiles
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

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

-- Create view for comment details with proper joins
CREATE OR REPLACE VIEW comment_details AS
SELECT 
  c.*,
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