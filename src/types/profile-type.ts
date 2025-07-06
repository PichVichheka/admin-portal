export interface Root {
  message: string;
  data: fetchProfile;
}

export interface fetchProfile {
  id: string;
  error: string;
  profile: string | null;
  full_name: string;
  user_name: string;
  email: string;
  password: string;
  avatar: string;
  is_deleted: boolean;
  roles: string[];
  created_at: string;
  updated_at: string;
}
