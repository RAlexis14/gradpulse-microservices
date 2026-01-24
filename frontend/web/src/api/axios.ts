import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { tokenStorage } from "./tokenStorage";

// Single Axios instance for the entire app.
// All requests go ONLY to the API Gateway base URL.
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000
});

api.interceptors.request.use(async (config) => {
  const token = await tokenStorage.getToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const status = err.response?.status;

    // Allow callers (e.g., safe API wrappers) to suppress toast errors.
    // This is useful when the UI can fallback to MOCK data without spamming the user.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const suppressToast = Boolean((err.config as any)?.headers?.["X-Suppress-Toast"]);

    // Any 401 forces logout and redirects to /login.
    if (status === 401) {
      await tokenStorage.clearToken();
      tokenStorage.clearRole();
      tokenStorage.clearStudentId();
      tokenStorage.clearEmail();
      toast.error("Session expired. Please login again.");
      window.location.assign("/login");
      return Promise.reject(err);
    }

    // Default error message (unless suppressed).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = err.response?.data;
    const message = data?.message || data?.detail || err.message || "Request failed";
    if (!suppressToast) toast.error(message);
    return Promise.reject(err);
  }
);
