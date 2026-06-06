export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          budget: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
          project_type: string | null
        }
        Insert: {
          budget?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          project_type?: string | null
        }
        Update: {
          budget?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          project_type?: string | null
        }
        Relationships: []
      }
      editor_reviews: {
        Row: {
          id: string
          editor_id: string
          author: string
          avatar: string
          rating: number
          date: string
          comment: string
          created_at: string
        }
        Insert: {
          id?: string
          editor_id: string
          author: string
          avatar?: string
          rating: number
          date?: string
          comment?: string
          created_at?: string
        }
        Update: {
          id?: string
          editor_id?: string
          author?: string
          avatar?: string
          rating?: number
          date?: string
          comment?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "editor_reviews_editor_id_fkey"
            columns: ["editor_id"]
            isOneToOne: false
            referencedRelation: "editors"
            referencedColumns: ["id"]
          },
        ]
      }
      editors: {
        Row: {
          id: string
          name: string
          avatar: string
          headline: string
          location: string
          hourly_rate: number
          rating: number
          review_count: number
          specialties: string[]
          software: string[]
          bio: string
          showreel: string | null
          skills: string[]
          portfolio_images: string[]
          created_at: string
        }
        Insert: {
          id: string
          name: string
          avatar?: string
          headline?: string
          location?: string
          hourly_rate?: number
          rating?: number
          review_count?: number
          specialties?: string[]
          software?: string[]
          bio?: string
          showreel?: string | null
          skills?: string[]
          portfolio_images?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          avatar?: string
          headline?: string
          location?: string
          hourly_rate?: number
          rating?: number
          review_count?: number
          specialties?: string[]
          software?: string[]
          bio?: string
          showreel?: string | null
          skills?: string[]
          portfolio_images?: string[]
          created_at?: string
        }
        Relationships: []
      }
      habit_logs: {
        Row: {
          created_at: string
          date: string
          habit_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          habit_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          habit_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "habit_logs_habit_id_fkey"
            columns: ["habit_id"]
            isOneToOne: false
            referencedRelation: "habits"
            referencedColumns: ["id"]
          },
        ]
      }
      habits: {
        Row: {
          color: string
          created_at: string
          description: string
          frequency: Json
          id: string
          name: string
          position: number
          reminder_time: string | null
          user_id: string
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string
          frequency?: Json
          id?: string
          name: string
          position?: number
          reminder_time?: string | null
          user_id: string
        }
        Update: {
          color?: string
          created_at?: string
          description?: string
          frequency?: Json
          id?: string
          name?: string
          position?: number
          reminder_time?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
