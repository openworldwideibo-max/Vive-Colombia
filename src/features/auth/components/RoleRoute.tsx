import { LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";
import {
  Navigate,
  useLocation,
} from "react-router";

import { useAuth } from "../context/AuthContext";
import type { UserRole } from "../types/auth.types";

interface RoleRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export default function RoleRoute({
  children,
  allowedRoles,
  redirectTo = "/mi-cuenta",
}: RoleRouteProps) {
  const location = useLocation();
  const {
    user,
    isAuthenticated,
    isLoading,
  } = useAuth();

  if (isLoading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6">
        <div className="text-center">
          <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-blue-600" />

          <p className="mt-4 font-semibold text-slate-600">
            Verificando tus permisos...
          </p>
        </div>
      </section>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/iniciar-sesion"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    );
  }

  return <>{children}</>;
}