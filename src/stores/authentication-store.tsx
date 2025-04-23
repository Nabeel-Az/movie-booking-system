import {
  UserProfile,
  AuthState,
  UsersStoreBase,
} from "@/models/stores/authentication-model";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createSelectors } from "./utility";

const initialUserProfile: UserProfile = {
  name: "",
  userId: "",
  password: "",
  role: "",
  token: "",
};

export const useAuthStoreBase = create<AuthState>()(
  persist(
    (set) => ({
      userProfile: initialUserProfile,
      setUserProfile: (userProfile: UserProfile) => {
        set(() => ({
          userProfile: {
            ...initialUserProfile,
            ...userProfile,
          },
        }));
      },
      clearUserProfile: () =>
        set(() => ({
          userProfile: initialUserProfile,
        })),
    }),
    {
      name: "MovieAuthSession",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        userProfile: state.userProfile,
      }),
    }
  )
);

export const useUsersStoreBase = create<UsersStoreBase>()((set) => ({
  userProfiles: [] as UserProfile[],
  storeUserList: (userProfiles: UserProfile[]) => set(() => ({ userProfiles })),
}));

export const useAuthStore = createSelectors(useAuthStoreBase);
export const useUsersStore = createSelectors(useUsersStoreBase);
