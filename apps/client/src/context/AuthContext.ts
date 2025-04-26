import { createContext } from "react";

export type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  refreshAccessToken: () => Promise<void>;
};

const defaultContext: AuthContextType = {
  accessToken: null,
  setAccessToken: () => {},
  refreshAccessToken: async () => {},
};

export const AuthContext = createContext(defaultContext);

// TODO: create hook for this in new hooks fodlder , useAuth
