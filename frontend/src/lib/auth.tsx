import * as React from "react";

import { apiFetch } from "@/lib/api";

/**
 * Client auth state, built from the server session only.
 *
 * There is no client-side lockout simulation and the session cookie is never
 * read from JavaScript -- `user` is derived entirely from what `GET /api/me`
 * returns (or its absence, on 401).
 */
export type AuthUser = {
  email: string;
  is_admin: boolean;
};

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let cancelled = false;
    apiFetch<AuthUser>("/api/me")
      .then((me) => {
        if (!cancelled) setUser(me);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const login = React.useCallback(async (email: string, password: string) => {
    const me = await apiFetch<AuthUser>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setUser(me);
  }, []);

  const signup = React.useCallback(async (email: string, password: string) => {
    const me = await apiFetch<AuthUser>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setUser(me);
  }, []);

  const logout = React.useCallback(async () => {
    await apiFetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  const value = React.useMemo(
    () => ({ user, loading, login, signup, logout }),
    [user, loading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
