import { create } from "zustand";
import { tokenStorage } from "../api/tokenStorage";
import type { Role } from "../types";

type AuthState = {
  token: string | null;
  studentId: number | null;
  role: Role | null;
  email: string | null;
  initializing: boolean;

  setToken: (token: string | null) => Promise<void>;
  setStudentId: (id: number | null) => void;
  setRole: (role: Role | null) => void;
  setEmail: (email: string | null) => void;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  studentId: null,
  role: null,
  email: null,
  initializing: true,

  async setToken(token) {
    if (token) await tokenStorage.setToken(token);
    else await tokenStorage.clearToken();
    set({ token });
  },

  setStudentId(id) {
    if (id == null) tokenStorage.clearStudentId();
    else tokenStorage.setStudentId(id);
    set({ studentId: id });
  },

  setRole(role) {
    if (role == null) tokenStorage.clearRole();
    else tokenStorage.setRole(role);
    set({ role });
  },

  setEmail(email) {
    if (email == null) tokenStorage.clearEmail();
    else tokenStorage.setEmail(email);
    set({ email });
  },

  async logout() {
    await tokenStorage.clearToken();
    tokenStorage.clearRole();
    tokenStorage.clearStudentId();
    tokenStorage.clearEmail();
    set({ token: null, role: null, studentId: null, email: null });
  },

  async hydrate() {
    const token = await tokenStorage.getToken();
    const studentId = tokenStorage.getStudentId();
    const role = tokenStorage.getRole();
    const email = tokenStorage.getEmail();
    set({ token, studentId, role, email, initializing: false });
  }
}));
