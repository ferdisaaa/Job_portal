import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Role, UserProfile } from "../types";
import { profile as mockProfile } from "../services/mockData";

type AuthContextValue = {
  user: UserProfile;
  role: Role;
  setRole: (role: Role) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(mockProfile.role);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: { ...mockProfile, role },
      role,
      setRole,
      logout: () => {
        localStorage.removeItem("careermatch_token");
        setRole("job_seeker");
      },
    }),
    [role],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
