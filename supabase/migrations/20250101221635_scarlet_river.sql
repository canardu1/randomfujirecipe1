-- Drop and recreate collection_recipes table with proper constraints
DROP TABLE IF EXISTS collection_recipes CASCADE;

CREATE TABLE collection_recipes (
  collection_id uuid REFERENCES recipe_collections ON DELETE CASCADE,
  recipe_id uuid REFERENCES public_recipes ON DELETE CASCADE,
  notes text,
  favorite boolean DEFAULT false,
  added_at timestamptz DEFAULT now(),
  PRIMARY KEY (collection_id, recipe_id)
);

-- Enable RLS
ALTER TABLE collection_recipes ENABLE ROW LEVEL SECURITY;

-- Update RLS policies
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

CREATE POLICY "Users can update collection recipes"
  ON collection_recipes
  FOR UPDATE
  TO authenticated
  USING (
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

-- Create function to handle duplicate inserts gracefully
CREATE OR REPLACE FUNCTION handle_collection_recipe_upsert()
RETURNS trigger AS $$
BEGIN
  -- If recipe already exists, update the timestamp and notes
  IF EXISTS (
    SELECT 1 FROM collection_recipes
    WHERE collection_id = NEW.collection_id
    AND recipe_id = NEW.recipe_id
  ) THEN
    UPDATE collection_recipes
    SET added_at = now(),
        notes = NEW.notes,
        favorite = NEW.favorite
    WHERE collection_id = NEW.collection_id
    AND recipe_id = NEW.recipe_id;
    RETURN NULL;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for upsert behavior
DROP TRIGGER IF EXISTS handle_collection_recipe_upsert ON collection_recipes;
CREATE TRIGGER handle_collection_recipe_upsert
  BEFORE INSERT ON collection_recipes
  FOR EACH ROW
  EXECUTE FUNCTION handle_collection_recipe_upsert();