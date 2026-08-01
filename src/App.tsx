import { Route, Routes } from "react-router";

import MainLayout from "./components/layout/MainLayout";
import {
  AdminCompaniesPage,
  AdminCreateCompanyPage,
  AdminLayout,
  AdminUsersPage,
} from "./features/admin";
import {
  ADMIN_ROLES,
  AccountPage,
  AdminDashboardPage,
  ForgotPasswordPage,
  LoginPage,
  ProtectedRoute,
  RegisterPage,
  RoleRoute,
} from "./features/auth";
import Andes from "./pages/Andes";
import Events from "./pages/Events";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* Plataforma pública */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route
          path="mapa"
          element={<MapPage />}
        />

        <Route
          path="eventos"
          element={<Events />}
        />

        <Route
          path="explorar"
          element={<Explore />}
        />

        <Route
          path="marketplace"
          element={<Marketplace />}
        />

        <Route
          path="andes"
          element={<Andes />}
        />

        <Route
          path="iniciar-sesion"
          element={<LoginPage />}
        />

        <Route
          path="recuperar-contrasena"
          element={<ForgotPasswordPage />}
        />

        <Route
          path="registro"
          element={<RegisterPage />}
        />

        <Route
          path="mi-cuenta"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Panel administrativo protegido */}
      <Route
        path="administracion"
        element={
          <RoleRoute allowedRoles={ADMIN_ROLES}>
            <AdminLayout />
          </RoleRoute>
        }
      >
        <Route
          index
          element={<AdminDashboardPage />}
        />

        <Route
          path="usuarios"
          element={<AdminUsersPage />}
        />

        <Route
          path="empresas"
          element={<AdminCompaniesPage />}
        />

        <Route
          path="empresas/nueva"
          element={<AdminCreateCompanyPage />}
        />
      </Route>

      {/* Página no encontrada */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}