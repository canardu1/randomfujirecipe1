-- Add preview_url directly to public_recipes
ALTER TABLE public_recipes 
ADD COLUMN IF NOT EXISTS preview_url text,
ADD COLUMN IF NOT EXISTS last_modified timestamptz DEFAULT now();

-- Add trigger to update last_modified
CREATE OR REPLACE FUNCTION update_last_modified()
RETURNS trigger AS $$
BEGIN
  NEW.last_modified = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_recipe_last_modified
  BEFORE UPDATE ON public_recipes
  FOR EACH ROW
  EXECUTE FUNCTION update_last_modified();

-- Add function to update preview_url
CREATE OR REPLACE FUNCTION update_recipe_preview(
  recipe_id uuid,
  new_preview_url text
) RETURNS void AS $$
BEGIN
  UPDATE public_recipes
  SET preview_url = new_preview_url,
      last_modified = now()
  WHERE id = recipe_id;
END;
$$ LANGUAGE plpgsql;