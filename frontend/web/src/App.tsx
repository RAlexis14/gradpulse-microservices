import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AppRouter } from "./router/AppRouter";
import { useAuthStore } from "./auth/authStore";
import { api } from "./api/axios";
import { endpoints } from "./api/endpoints";

export default function App() {
  const hydrate = useAuthStore((s) => s.hydrate);

  useEffect(() => {
    // Hydrate token/role/studentId from storage.
    hydrate();

    // Optional health ping (does not break UI if down).
    api.get(endpoints.health()).catch(() => {});
  }, [hydrate]);

  return (
    <>
      <AppRouter />
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
    </>
  );
}
