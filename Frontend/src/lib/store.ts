import { create } from "zustand";

type Role = "ADMIN" | "BIBLIOTHECAIRE" | "MEMBRE";

interface AuthState {
  isAuthenticated: boolean;
  user: { nom: string; email: string; role: Role } | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (email: string, _password: string) => {
    // Mock login
    const mockUsers: Record<string, { nom: string; email: string; role: Role }> = {
      "admin@cloudlibrary.com": { nom: "Admin Principal", email: "admin@cloudlibrary.com", role: "ADMIN" },
      "sophie@example.com": { nom: "Sophie Bernard", email: "sophie@example.com", role: "BIBLIOTHECAIRE" },
      "marie@example.com": { nom: "Marie Dupont", email: "marie@example.com", role: "MEMBRE" },
    };
    const user = mockUsers[email];
    if (user) {
      set({ isAuthenticated: true, user });
      return true;
    }
    return false;
  },
  logout: () => set({ isAuthenticated: false, user: null }),
}));
