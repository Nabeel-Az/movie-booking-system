import { UserProfile } from "@/models/stores/authentication-model";
import { useAuthStore } from "@/stores/authentication-store";
import { createContext, useContext, useMemo, useCallback } from "react";

export type AuthContextType = {
  login: (userProfile: UserProfile) => void;
  logout: () => void;
  userProfile: UserProfile;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const userProfile = useAuthStore.get.userProfile();
  const setUserProfile = useAuthStore.get.setUserProfile();
  const clearUserProfile = useAuthStore.get.clearUserProfile();
  const login = useCallback(
    (userProfile: UserProfile) => {
      setUserProfile(userProfile);
    },
    [setUserProfile]
  );
  const logout = useCallback(() => {
    clearUserProfile();
  }, [clearUserProfile]);

  const contextValue = useMemo(
    () => ({ login, logout, userProfile }),
    [login, logout, userProfile]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
