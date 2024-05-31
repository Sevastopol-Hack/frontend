import { create } from "zustand";
import { User } from "../API/UserService";

interface UserSate {
  user?: User;
  setUser: (user: User) => void;
}

export const useSelf = create<UserSate>((set) => ({
  user: undefined,
  setUser: (user: User) =>
    set({
      user,
    }),
}));
