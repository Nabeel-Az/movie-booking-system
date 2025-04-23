export interface UserProfile {
  name: string;
  userId: string;
  password?: string;
  role: string;
  token: string | null;
}

export interface AuthState {
  userProfile: UserProfile;
  setUserProfile: (userProfile: UserProfile) => void;
  clearUserProfile: () => void;
}

export interface UsersStoreBase {
  userProfiles: UserProfile[];
  storeUserList: (userProfile: UserProfile[]) => void;
}
