import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    let active = true;

    console.debug("[Auth] Initialization started");

    const clearAuthState = () => {
      if (!active) return;
      setSession(null);
      setUser(null);
      setProfile(null);
      setRole(null);
      setProfileError(null);
    };

    const fetchProfile = async (userId) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, role, created_at, updated_at")
        .eq("id", userId)
        .maybeSingle();

      if (error) throw error;
      return data;
    };

    const resolveSession = async (nextSession) => {
      if (!active) return;

      setSession(nextSession ?? null);
      setUser(nextSession?.user ?? null);

      if (!nextSession?.user) {
        setProfile(null);
        setRole(null);
        setProfileError(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const nextProfile = await fetchProfile(nextSession.user.id);

        if (!active) return;

        if (!nextProfile) {
          setProfile(null);
          setRole(null);
          setProfileError("Profile record was not found.");
          return;
        }

        setProfile(nextProfile);
        setRole(nextProfile.role);
        setProfileError(null);
      } catch (error) {
        console.error("[Auth] Failed to load profile:", error);

        if (!active) return;

        setProfile(null);
        setRole(null);
        setProfileError("Unable to load your account profile.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    const initialize = async () => {
      setLoading(true);

      try {
        const {
          data: { session: initialSession },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        console.debug("[Auth] Session exists:", Boolean(initialSession));

        await resolveSession(initialSession);
      } catch (error) {
        console.error("[Auth] Initialization failed:", error);

        clearAuthState();

        if (active) {
          setLoading(false);
        }
      } finally {
        if (active) {
          console.debug("[Auth] Loading completed");
        }
      }
    };

    void initialize();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;

      // Keep the auth callback synchronous.
      // Run profile resolution outside the callback stack.
      queueMicrotask(() => {
        if (active) {
          void resolveSession(nextSession);
        }
      });
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const refreshProfile = async () => {
    if (user) {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (!error && data) {
          setProfile(data);
          setRole(data.role);
        }
      } catch(err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signUpStudent = async (email, password, fullName) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      return { data, error };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (error) {
      return { error };
    }
  };

  const value = { session, user, profile, role, loading, profileError, signIn, signUpStudent, signOut, refreshProfile };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
