import {
  LoaderCircle,
  LogOut,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import { Navigate } from "react-router";
import { logoutUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";

const roleLabels = {
  super_admin: "Superadministrador",
  admin: "Administrador",
  operator: "Operador turístico",
  hotel: "Hotel",
  restaurant: "Restaurante",
  guide: "Guía turístico",
  business: "Empresa",
  tourist: "Turista",
};

export default function AccountPage() {
  const { user, isLoading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (isLoading) {
    return (
      <section className="flex min-h-[70vh] items-center justify-center">
        <LoaderCircle className="h-10 w-10 animate-spin text-blue-600" />
      </section>
    );
  }

  if (!user) {
    return <Navigate to="/iniciar-sesion" replace />;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logoutUser();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <section className="min-h-[75vh] bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName ?? "Usuario"}
                  className="h-20 w-20 rounded-3xl object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                  <UserRound className="h-10 w-10" />
                </div>
              )}

              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                  Mi cuenta
                </p>

                <h1 className="mt-1 text-3xl font-black text-slate-950">
                  {user.displayName ?? "Usuario VIVE+"}
                </h1>

                <p className="mt-1 text-slate-500">{user.email}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-red-200 px-5 font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
            >
              {isLoggingOut ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                <LogOut className="h-5 w-5" />
              )}

              Cerrar sesión
            </button>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <ShieldCheck className="h-7 w-7 text-emerald-600" />

              <p className="mt-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                Rol
              </p>

              <p className="mt-1 text-xl font-black text-slate-950">
                {roleLabels[user.role]}
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <UserRound className="h-7 w-7 text-blue-600" />

              <p className="mt-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                Estado
              </p>

              <p className="mt-1 text-xl font-black text-emerald-700">
                {user.isActive ? "Cuenta activa" : "Cuenta inactiva"}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}