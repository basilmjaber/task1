import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '../utils/supabase/client';

type UserRole = 'user' | 'admin' | null;

interface User {
  username: string;
  role: UserRole;
  email: string;
  id: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a single Supabase client instance
const supabase = createClient();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Show login page immediately
    setLoading(false);

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      if (session?.user) {
        try {
          const { data: userData } = await supabase
            .from('users')
            .select('role, username')
            .eq('id', session.user.id)
            .single();

          if (mounted && userData) {
            setUser({
              id: session.user.id,
              email: session.user.email ?? '',
              username: userData.username || session.user.email?.split('@')[0] || 'User',
              role: userData.role as UserRole,
            });
          }
        } catch (error) {
          // Silently fail
        }
      } else if (mounted) {
        setUser(null);
      }
    });

    // Check for existing session after a delay
    const checkSessionTimer = setTimeout(async () => {
      if (!mounted) return;
      
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (mounted && session?.user) {
          const { data: userData } = await supabase
            .from('users')
            .select('role, username')
            .eq('id', session.user.id)
            .single();

          if (mounted && userData) {
            setUser({
              id: session.user.id,
              email: session.user.email ?? '',
              username: userData.username || session.user.email?.split('@')[0] || 'User',
              role: userData.role as UserRole,
            });
          }
        }
      } catch (error) {
        // Silently fail
      }
    }, 1000);

    return () => {
      mounted = false;
      clearTimeout(checkSessionTimer);
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error || !data.user) {
        return false;
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('role, username')
        .eq('id', data.user.id)
        .single();

      if (!userError && userData) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? '',
          username: userData.username || data.user.email?.split('@')[0] || 'User',
          role: userData.role as UserRole,
        });
        return true;
      } else {
        await supabase.auth.signOut();
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      // Silently fail
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
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