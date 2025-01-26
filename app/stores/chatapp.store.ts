import { create } from "zustand";
import { getLocalStorageItem } from "~/utils/signin.utils";
import { io } from "socket.io-client";

export const USER_ACCESS_TOKEN_KEY = "chatAppAccessToken";

export type TUserDetails = {
  userName: string;
  email: string;
  createdAt: number;
};

export type TUser = {
  name: string;
  email: string;
};

export type TAllUsers = TUser | [];

type TChatApp = {
  userDetails: TUserDetails | null;
  setUserDetails: (payload: TUserDetails | null) => void;
  allUsers: TAllUsers;
  setAllUsers: (payload: TAllUsers) => void;
  isValidationLoading: boolean;
  setIsValidationLoading: (payload: boolean) => void;
  isValidationSuccess: boolean;
  setIsValidationSuccess: (payload: boolean) => void;
  conversations: any[];
  setConversations: (payload: any[]) => void;
};

export const useChatAppStore = create<TChatApp>((set) => ({
  // sign in details
  userDetails: null,
  setUserDetails: (payload: any) => set({ userDetails: payload }),

  // all registered users
  allUsers: [],
  setAllUsers: (payload: TAllUsers) => set({ allUsers: payload }),

  // sign in loaders
  isValidationLoading: false,
  setIsValidationLoading: (payload: boolean) => set({ isValidationLoading: payload }),
  isValidationSuccess: false,
  setIsValidationSuccess: (payload: boolean) => set({ isValidationSuccess: payload }),

  // conversations
  conversations: [],
  setConversations: (payload: any[]) => set({ conversations: payload }),
}));

export const useSocketStore = create<any>((set) => ({
  socket: null,
  setSocket: (payload: any) => set({ socket: payload }),
}));
