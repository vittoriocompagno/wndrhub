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
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          profile_image: string | null
          subscription_tier: 'FREE' | 'PRO' | 'PREMIUM'
          subscription_start_date: string
          subscription_end_date: string | null
          has_purchased_easy_tap: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name: string
          last_name: string
          profile_image?: string | null
          subscription_tier?: 'FREE' | 'PRO' | 'PREMIUM'
          subscription_start_date?: string
          subscription_end_date?: string | null
          has_purchased_easy_tap?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string
          last_name?: string
          profile_image?: string | null
          subscription_tier?: 'FREE' | 'PRO' | 'PREMIUM'
          subscription_start_date?: string
          subscription_end_date?: string | null
          has_purchased_easy_tap?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          title: string | null
          description: string | null
          address: string | null
          image_url: string | null
          category: string | null
          google_place_id: string | null
          google_rating: number | null
          total_reviews: number | null
          page_views: number
          unique_views: number
          last_viewed_at: string | null
          review_links: Json | null
          added_category: boolean
          added_description: boolean
          added_location: boolean
          created_at: string
          updated_at: string
          user_id: string
          contact_email: string | null
          contact_phone: string | null
        }
        Insert: {
          id?: string
          title?: string | null
          description?: string | null
          address?: string | null
          image_url?: string | null
          category?: string | null
          google_place_id?: string | null
          google_rating?: number | null
          total_reviews?: number | null
          page_views?: number
          unique_views?: number
          last_viewed_at?: string | null
          review_links?: Json | null
          added_category?: boolean
          added_description?: boolean
          added_location?: boolean
          created_at?: string
          updated_at?: string
          user_id: string
          contact_email?: string | null
          contact_phone?: string | null
        }
        Update: {
          id?: string
          title?: string | null
          description?: string | null
          address?: string | null
          image_url?: string | null
          category?: string | null
          google_place_id?: string | null
          google_rating?: number | null
          total_reviews?: number | null
          page_views?: number
          unique_views?: number
          last_viewed_at?: string | null
          review_links?: Json | null
          added_category?: boolean
          added_description?: boolean
          added_location?: boolean
          created_at?: string
          updated_at?: string
          user_id?: string
          contact_email?: string | null
          contact_phone?: string | null
        }
      }
    }
    Functions: {
      create_users_table: {
        Args: Record<string, never>
        Returns: undefined
      }
      create_properties_table: {
        Args: Record<string, never>
        Returns: undefined
      }
      create_analytics_table: {
        Args: Record<string, never>
        Returns: undefined
      }
    }
  }
}