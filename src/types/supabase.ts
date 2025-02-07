export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  preferences?: Record<string, any>;
}

export interface Message {
  id: string;
  content: string;
  user_id: string;
  role: 'user' | 'assistant';
  created_at: string;
  deleted_at?: string | null;
  avatar_url?: string;
  is_typing?: boolean;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  is_archived: boolean;
}

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  last_seen?: string;
} 