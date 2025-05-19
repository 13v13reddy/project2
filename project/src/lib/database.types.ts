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
          name: string
          email: string
          role: 'admin' | 'host' | 'security'
          department: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role: 'admin' | 'host' | 'security'
          department?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'admin' | 'host' | 'security'
          department?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      locations: {
        Row: {
          id: string
          name: string
          address: string
          city: string
          state: string
          zip_code: string
          country: string
          capacity: number
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          city: string
          state: string
          zip_code: string
          country: string
          capacity: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          country?: string
          capacity?: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      visitors: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          company: string | null
          purpose: string
          host_id: string
          photo_url: string | null
          document_url: string | null
          status: 'pre_registered' | 'checked_in' | 'checked_out' | 'canceled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          company?: string | null
          purpose: string
          host_id: string
          photo_url?: string | null
          document_url?: string | null
          status: 'pre_registered' | 'checked_in' | 'checked_out' | 'canceled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          company?: string | null
          purpose?: string
          host_id?: string
          photo_url?: string | null
          document_url?: string | null
          status?: 'pre_registered' | 'checked_in' | 'checked_out' | 'canceled'
          created_at?: string
          updated_at?: string
        }
      }
      visitor_logs: {
        Row: {
          id: string
          visitor_id: string
          host_id: string
          location_id: string
          check_in_time: string
          check_out_time: string | null
          status: 'expected' | 'checked_in' | 'checked_out' | 'canceled'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          visitor_id: string
          host_id: string
          location_id: string
          check_in_time: string
          check_out_time?: string | null
          status: 'expected' | 'checked_in' | 'checked_out' | 'canceled'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          visitor_id?: string
          host_id?: string
          location_id?: string
          check_in_time?: string
          check_out_time?: string | null
          status?: 'expected' | 'checked_in' | 'checked_out' | 'canceled'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}