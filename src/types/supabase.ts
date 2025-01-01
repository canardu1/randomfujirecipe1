export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      saved_recipes: {
        Row: {
          id: string
          user_id: string
          recipe: Json
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          recipe: Json
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          recipe?: Json
          created_at?: string
        }
      }
    }
  }
}