import {
  AlertCircle,
  ArrowRight,
  Building2,
  CheckCircle2,
  LoaderCircle,
  RefreshCw,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import { getAllUsers } from "../../admin/services/users.service";
import { useAuth } from "../context/AuthContext";
import {
  BUSINESS_ROLES,
  getUserRoleLabel,
  type AppUser,
} from "../types/auth.types";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "No fue posible cargar las estadísticas.";
}

export default function AdminDashboardPage() {
  const { user } = useAuth();

  const [users, setUsers] = useState<AppUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadDashboardData = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const loadedUsers = await getAllUsers();
      setUsers(loadedUsers);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadDashboardData();
  }, []);

  const statistics = useMemo(() => {
    const activeUsers = users.filter(
      (registeredUser) => registeredUser.isActive,
    ).length;

    const administrators = users.filter((registeredUser) =>
      ["admin", "super_admin"].includes(registeredUser.role),
    ).length;

    const tourists = users.filter(
      (registeredUser) => registeredUser.role === "tourist",
    ).length;

    const businessUsers = users.filter((registeredUser) =>
      BUSINESS_ROLES.includes(registeredUser.role),
    ).length;

    return {
      totalUsers: users.length,
      activeUsers,
      administrators,
      tourists,
      businessUsers,
    };
  }, [users]);

  const recentUsers = useMemo(() => {
    return users.slice(0, 5);
  }, [users]);

  return (
    <section className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-slate-950 px-7 py-9 text-white shadow-xl sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
                Resumen general
              </p>

              <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                Panel administrativo
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Bienvenido, {user?.displayName ?? "Administrador"}.
                Consulta el estado general de VIVE+COLOMBIA y accede a
                los módulos administrativos.
              </p>

              {user && (
                <div className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-blue-200">
                  Rol: {getUserRoleLabel(user.role)}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => void loadDashboardData()}
              disabled={isLoading}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 font-bold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                <RefreshCw className="h-5 w-5" />
              )}

              Actualizar datos
            </button>
          </div>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mt-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

            <p className="font-semibold">{errorMessage}</p>
          </div>
        )}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <Users className="h-6 w-6" />
            </div>

            <p className="mt-5 text-sm font-black uppercase tracking-wider text-slate-500">
              Usuarios
            </p>

            <p className="mt-1 text-3xl font-black text-slate-950">
              {isLoading ? "—" : statistics.totalUsers}
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>

            <p className="mt-5 text-sm font-black uppercase tracking-wider text-slate-500">
              Activos
            </p>

            <p className="mt-1 text-3xl font-black text-slate-950">
              {isLoading ? "—" : statistics.activeUsers}
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <p className="mt-5 text-sm font-black uppercase tracking-wider text-slate-500">
              Administradores
            </p>

            <p className="mt-1 text-3xl font-black text-slate-950">
              {isLoading ? "—" : statistics.administrators}
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <UserRound className="h-6 w-6" />
            </div>

            <p className="mt-5 text-sm font-black uppercase tracking-wider text-slate-500">
              Turistas
            </p>

            <p className="mt-1 text-3xl font-black text-slate-950">
              {isLoading ? "—" : statistics.tourists}
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <Building2 className="h-6 w-6" />
            </div>

            <p className="mt-5 text-sm font-black uppercase tracking-wider text-slate-500">
              Prestadores
            </p>

            <p className="mt-1 text-3xl font-black text-slate-950">
              {isLoading ? "—" : statistics.businessUsers}
            </p>
          </article>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.5fr_1fr]">
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-wider text-blue-600">
                  Usuarios
                </p>

                <h2 className="mt-1 text-2xl font-black text-slate-950">
                  Perfiles registrados
                </h2>
              </div>

              <Link
                to="/administracion/usuarios"
                className="inline-flex items-center gap-2 font-bold text-blue-600 transition hover:text-blue-700"
              >
                Administrar usuarios
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {isLoading ? (
              <div className="flex min-h-72 items-center justify-center">
                <div className="text-center">
                  <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-blue-600" />

                  <p className="mt-4 font-semibold text-slate-600">
                    Cargando información...
                  </p>
                </div>
              </div>
            ) : recentUsers.length === 0 ? (
              <div className="flex min-h-72 items-center justify-center px-6 text-center">
                <div>
                  <Users className="mx-auto h-12 w-12 text-slate-300" />

                  <h3 className="mt-4 text-xl font-black text-slate-950">
                    No hay usuarios registrados
                  </h3>

                  <p className="mt-2 text-slate-600">
                    Los usuarios nuevos aparecerán aquí.
                  </p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentUsers.map((registeredUser) => (
                  <article
                    key={registeredUser.uid}
                    className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      {registeredUser.photoURL ? (
                        <img
                          src={registeredUser.photoURL}
                          alt={
                            registeredUser.displayName ??
                            "Usuario"
                          }
                          className="h-12 w-12 shrink-0 rounded-2xl object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 font-black text-blue-600">
                          {(
                            registeredUser.displayName ??
                            registeredUser.email ??
                            "U"
                          )
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="truncate font-black text-slate-950">
                          {registeredUser.displayName ??
                            "Usuario sin nombre"}
                        </p>

                        <p className="mt-1 truncate text-sm text-slate-500">
                          {registeredUser.email ?? "Sin correo"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 sm:justify-end">
                      <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-700">
                        {getUserRoleLabel(registeredUser.role)}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          registeredUser.isActive
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {registeredUser.isActive
                          ? "Activo"
                          : "Inactivo"}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-black uppercase tracking-wider text-blue-600">
              Accesos rápidos
            </p>

            <h2 className="mt-1 text-2xl font-black text-slate-950">
              Módulos administrativos
            </h2>

            <div className="mt-6 space-y-3">
              <Link
                to="/administracion/usuarios"
                className="group flex items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                    <Users className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-black text-slate-950">
                      Usuarios
                    </p>

                    <p className="text-sm text-slate-500">
                      Roles y estados
                    </p>
                  </div>
                </div>

                <ArrowRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-600" />
              </Link>

              <div className="flex cursor-not-allowed items-center justify-between rounded-2xl border border-slate-200 p-4 opacity-60">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <Building2 className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-black text-slate-950">
                      Empresas
                    </p>

                    <p className="text-sm text-slate-500">
                      Próximamente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}