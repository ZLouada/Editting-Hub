import { useState, useEffect, useCallback } from "react";
import type { AuthUser, AuthSession } from "@/lib/auth";
import { getSession, getUser, onAuthStateChange, signOut as authSignOut } from "@/lib/auth";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    async function init() {
      try {
        const currentSession = await getSession();
        if (!mounted) return;
        setSession(currentSession);
        if (currentSession) {
          const currentUser = await getUser();
          if (!mounted) return;
          setUser(currentUser);
        }
      } catch {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    }

    init();

    // Listen for auth changes
    const subscription = onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const logout = useCallback(async () => {
    await authSignOut();
    setUser(null);
    setSession(null);
  }, []);

  return {
    user,
    session,
    loading,
    isAuthenticated: !!session,
    logout,
  };
}
