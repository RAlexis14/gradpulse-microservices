/* eslint-disable @typescript-eslint/no-explicit-any */
type ElectronTokenAPI = {
  getToken: () => Promise<string | null>;
  setToken: (token: string) => Promise<void>;
  clearToken: () => Promise<void>;
};

declare global {
  interface Window {
    gradpulse?: ElectronTokenAPI;
  }
}

const WEB_KEY = "gradpulse_access_token";
const ID_KEY = "gradpulse_student_id";
const ROLE_KEY = "gradpulse_role";
const EMAIL_KEY = "gradpulse_email";

export const tokenStorage = {
  async getToken(): Promise<string | null> {
    if (window.gradpulse?.getToken) return window.gradpulse.getToken();
    return localStorage.getItem(WEB_KEY);
  },
  async setToken(token: string): Promise<void> {
    if (window.gradpulse?.setToken) return window.gradpulse.setToken(token);
    localStorage.setItem(WEB_KEY, token);
  },
  async clearToken(): Promise<void> {
    if (window.gradpulse?.clearToken) return window.gradpulse.clearToken();
    localStorage.removeItem(WEB_KEY);
  },

  getStudentId(): number | null {
    const raw = localStorage.getItem(ID_KEY);
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  },
  setStudentId(id: number): void {
    localStorage.setItem(ID_KEY, String(id));
  },
  clearStudentId(): void {
    localStorage.removeItem(ID_KEY);
  },

  getRole(): "STUDENT" | "ADMIN" | null {
    const raw = localStorage.getItem(ROLE_KEY);
    if (raw === "STUDENT" || raw === "ADMIN") return raw;
    return null;
  },
  setRole(role: "STUDENT" | "ADMIN"): void {
    localStorage.setItem(ROLE_KEY, role);
  },
  clearRole(): void {
    localStorage.removeItem(ROLE_KEY);
  },

  getEmail(): string | null {
    return localStorage.getItem(EMAIL_KEY);
  },
  setEmail(email: string): void {
    localStorage.setItem(EMAIL_KEY, email);
  },
  clearEmail(): void {
    localStorage.removeItem(EMAIL_KEY);
  }
};
