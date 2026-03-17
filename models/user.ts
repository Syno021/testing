export type UserRole = "farmer" | "agronomist";

// Matches the public.users table in Supabase
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  region?: string;
  created_at: Date;
  updated_at: Date;
}

