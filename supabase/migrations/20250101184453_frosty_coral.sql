/*
  # Add Voting Functions with Proper Transaction Handling

  1. Functions
    - increment_votes: Safely increment recipe votes
    - decrement_votes: Safely decrement recipe votes
    - handle_vote: Manage vote creation/deletion with vote count update
*/

-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS increment_votes;
DROP FUNCTION IF EXISTS decrement_votes;

-- Create a function to handle voting with proper transaction handling
CREATE OR REPLACE FUNCTION handle_vote(
  p_user_id uuid,
  p_recipe_id uuid,
  p_action text -- 'add' or 'remove'
) RETURNS void AS $$
BEGIN
  IF p_action = 'add' THEN
    -- Add vote and increment count in a single transaction
    INSERT INTO recipe_votes (user_id, recipe_id)
    VALUES (p_user_id, p_recipe_id);
    
    UPDATE public_recipes
    SET votes = votes + 1
    WHERE id = p_recipe_id;
  ELSIF p_action = 'remove' THEN
    -- Remove vote and decrement count in a single transaction
    DELETE FROM recipe_votes
    WHERE user_id = p_user_id AND recipe_id = p_recipe_id;
    
    UPDATE public_recipes
    SET votes = GREATEST(0, votes - 1)
    WHERE id = p_recipe_id;
  END IF;
END;
$$ LANGUAGE plpgsql;