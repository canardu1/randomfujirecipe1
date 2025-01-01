-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS increment_votes;
DROP FUNCTION IF EXISTS decrement_votes;
DROP FUNCTION IF EXISTS handle_vote;

-- Create a function to handle voting with proper transaction handling
CREATE OR REPLACE FUNCTION handle_vote(
  p_user_id uuid,
  p_recipe_id uuid,
  p_action text -- 'add' or 'remove'
) RETURNS void AS $$
DECLARE
  v_current_votes integer;
BEGIN
  -- Start transaction
  BEGIN
    IF p_action = 'add' THEN
      -- Check if vote already exists
      IF EXISTS (
        SELECT 1 FROM recipe_votes 
        WHERE user_id = p_user_id AND recipe_id = p_recipe_id
      ) THEN
        RAISE EXCEPTION 'Vote already exists';
      END IF;

      -- Add vote
      INSERT INTO recipe_votes (user_id, recipe_id)
      VALUES (p_user_id, p_recipe_id);
      
      -- Increment count
      UPDATE public_recipes
      SET votes = votes + 1
      WHERE id = p_recipe_id
      RETURNING votes INTO v_current_votes;
      
    ELSIF p_action = 'remove' THEN
      -- Check if vote exists
      IF NOT EXISTS (
        SELECT 1 FROM recipe_votes 
        WHERE user_id = p_user_id AND recipe_id = p_recipe_id
      ) THEN
        RAISE EXCEPTION 'Vote does not exist';
      END IF;

      -- Remove vote
      DELETE FROM recipe_votes
      WHERE user_id = p_user_id AND recipe_id = p_recipe_id;
      
      -- Decrement count
      UPDATE public_recipes
      SET votes = GREATEST(0, votes - 1)
      WHERE id = p_recipe_id
      RETURNING votes INTO v_current_votes;
    END IF;

    -- Commit transaction
    EXCEPTION WHEN OTHERS THEN
      RAISE;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION handle_vote TO authenticated;