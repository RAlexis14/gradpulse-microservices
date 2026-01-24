import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth } from "../auth/RequireAuth";
import { RequireRole } from "../auth/RequireRole";

import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import AcademicProfilePage from "../pages/academic/ProfilePage";
import ProgramsPage from "../pages/community/ProgramsPage";
import CommunityHoursPage from "../pages/community/HoursPage";
import OffersPage from "../pages/internships/OffersPage";
import InternshipHoursPage from "../pages/internships/HoursPage";
import CoursesPage from "../pages/languages/CoursesPage";
import EnglishLevelPage from "../pages/languages/LevelPage";
import LibraryClearancePage from "../pages/library/ClearancePage";
import FinanceClearancePage from "../pages/finance/ClearancePage";
import PaymentsPage from "../pages/payments/PaymentsPage";
import GraduationStatusPage from "../pages/graduation/StatusPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import AdminPage from "../pages/admin/AdminPage";

function pickRouter() {
  // Electron injects window.gradpulse via preload.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isElectron = Boolean((window as any).gradpulse);
  return isElectron ? HashRouter : BrowserRouter;
}

export function AppRouter() {
  const Router = pickRouter();

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/academic/profile" element={<RequireAuth><AcademicProfilePage /></RequireAuth>} />

        <Route path="/community/programs" element={<RequireAuth><ProgramsPage /></RequireAuth>} />
        <Route path="/community/hours" element={<RequireAuth><CommunityHoursPage /></RequireAuth>} />

        <Route path="/internships/offers" element={<RequireAuth><OffersPage /></RequireAuth>} />
        <Route path="/internships/hours" element={<RequireAuth><InternshipHoursPage /></RequireAuth>} />

        <Route path="/languages/courses" element={<RequireAuth><CoursesPage /></RequireAuth>} />
        <Route path="/languages/level" element={<RequireAuth><EnglishLevelPage /></RequireAuth>} />

        <Route path="/library" element={<RequireAuth><LibraryClearancePage /></RequireAuth>} />
        <Route path="/finance" element={<RequireAuth><FinanceClearancePage /></RequireAuth>} />
        <Route path="/payments" element={<RequireAuth><PaymentsPage /></RequireAuth>} />
        <Route path="/graduation/status" element={<RequireAuth><GraduationStatusPage /></RequireAuth>} />
        <Route path="/notifications" element={<RequireAuth><NotificationsPage /></RequireAuth>} />

        <Route
          path="/admin"
          element={
            <RequireAuth>
              <RequireRole role="ADMIN">
                <AdminPage />
              </RequireRole>
            </RequireAuth>
          }
        />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
