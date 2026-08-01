import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  RefreshCw,
  Search,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "../../auth/context/AuthContext";
import {
  getUserRoleLabel,
  type AppUser,
  type UserRole,
} from "../../auth/types/auth.types";
import {
  getAllUsers,
  updateUserRole,
  updateUserStatus,
} from "../services/users.service";

const editableRoles: UserRole[] = [
  "admin",
  "operator",
  "hotel",
  "restaurant",
  "guide",
  "transport",
  "artisan",
  "event_creator",
  "business",
  "tourist",
];

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error inesperado.";
}

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth();

  const [users, setUsers] = useState<AppUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadUsers = async () => {
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
    void loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    if (!normalizedSearch) {
      return users;
    }

    return users.filter((user) => {
      const name = user.displayName?.toLowerCase() ?? "";
      const email = user.email?.toLowerCase() ?? "";
      const role = getUserRoleLabel(user.role).toLowerCase();

      return (
        name.includes(normalizedSearch) ||
        email.includes(normalizedSearch) ||
        role.includes(normalizedSearch)
      );
    });
  }, [searchTerm, users]);

  const handleRoleChange = async (
    targetUser: AppUser,
    newRole: UserRole,
  ) => {
    if (!currentUser) {
      return;
    }

    setUpdatingUserId(targetUser.uid);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const result = await updateUserRole({
        targetUserId: targetUser.uid,
        newRole,
        currentAdminId: currentUser.uid,
      });

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.uid === targetUser.uid
            ? {
                ...user,
                role: newRole,
              }
            : user,
        ),
      );

      setSuccessMessage(result.message);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleStatusChange = async (
    targetUser: AppUser,
  ) => {
    if (!currentUser) {
      return;
    }

    const newStatus = !targetUser.isActive;

    setUpdatingUserId(targetUser.uid);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const result = await updateUserStatus({
        targetUserId: targetUser.uid,
        isActive: newStatus,
        currentAdminId: currentUser.uid,
      });

      if (!result.success) {
        setErrorMessage(result.message);
        return;
      }

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.uid === targetUser.uid
            ? {
                ...user,
                isActive: newStatus,
              }
            : user,
        ),
      );

      setSuccessMessage(result.message);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setUpdatingUserId(null);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-slate-950 px-7 py-9 text-white shadow-xl sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
                Administración
              </p>

              <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                Gestión de usuarios
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Consulta perfiles, cambia roles y controla el acceso
                de los usuarios registrados en VIVE+COLOMBIA.
              </p>
            </div>

            <button
              type="button"
              onClick={() => void loadUsers()}
              disabled={isLoading}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 font-bold text-slate-950 transition hover:bg-slate-100 disabled:opacity-60"
            >
              {isLoading ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                <RefreshCw className="h-5 w-5" />
              )}

              Actualizar
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="font-semibold">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="font-semibold">{errorMessage}</p>
          </div>
        )}

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <Users className="h-7 w-7 text-blue-600" />

            <p className="mt-4 text-sm font-bold uppercase tracking-wider text-slate-500">
              Total de usuarios
            </p>

            <p className="mt-1 text-3xl font-black text-slate-950">
              {users.length}
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <CheckCircle2 className="h-7 w-7 text-emerald-600" />

            <p className="mt-4 text-sm font-bold uppercase tracking-wider text-slate-500">
              Cuentas activas
            </p>

            <p className="mt-1 text-3xl font-black text-slate-950">
              {users.filter((user) => user.isActive).length}
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <ShieldCheck className="h-7 w-7 text-violet-600" />

            <p className="mt-4 text-sm font-bold uppercase tracking-wider text-slate-500">
              Administradores
            </p>

            <p className="mt-1 text-3xl font-black text-slate-950">
              {
                users.filter((user) =>
                  ["admin", "super_admin"].includes(user.role),
                ).length
              }
            </p>
          </article>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Buscar por nombre, correo o rol"
              className="min-h-12 w-full rounded-2xl border border-slate-300 pl-12 pr-4 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {isLoading ? (
            <div className="flex min-h-72 items-center justify-center">
              <div className="text-center">
                <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-blue-600" />

                <p className="mt-4 font-semibold text-slate-600">
                  Cargando usuarios...
                </p>
              </div>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex min-h-72 items-center justify-center px-6 text-center">
              <div>
                <UserCog className="mx-auto h-12 w-12 text-slate-300" />

                <h2 className="mt-4 text-xl font-black text-slate-950">
                  No se encontraron usuarios
                </h2>

                <p className="mt-2 text-slate-600">
                  Prueba con otro nombre, correo o rol.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                      Usuario
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                      Rol
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                      Estado
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-500">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((user) => {
                    const isProtected =
                      user.role === "super_admin" ||
                      user.uid === currentUser?.uid;

                    const isUpdating =
                      updatingUserId === user.uid;

                    return (
                      <tr key={user.uid}>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            {user.photoURL ? (
                              <img
                                src={user.photoURL}
                                alt={user.displayName ?? "Usuario"}
                                className="h-11 w-11 rounded-2xl object-cover"
                              />
                            ) : (
                              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 font-black text-blue-600">
                                {(user.displayName ??
                                  user.email ??
                                  "U")
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                            )}

                            <div>
                              <p className="font-black text-slate-950">
                                {user.displayName ??
                                  "Usuario sin nombre"}
                              </p>

                              <p className="mt-1 text-sm text-slate-500">
                                {user.email ?? "Sin correo"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          {isProtected ? (
                            <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-sm font-bold text-violet-700">
                              {getUserRoleLabel(user.role)}
                            </span>
                          ) : (
                            <select
                              value={user.role}
                              disabled={isUpdating}
                              onChange={(event) =>
                                void handleRoleChange(
                                  user,
                                  event.target.value as UserRole,
                                )
                              }
                              className="min-h-11 rounded-xl border border-slate-300 bg-white px-3 font-semibold text-slate-800 outline-none focus:border-blue-500"
                            >
                              {editableRoles.map((role) => (
                                <option
                                  key={role}
                                  value={role}
                                >
                                  {getUserRoleLabel(role)}
                                </option>
                              ))}
                            </select>
                          )}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${
                              user.isActive
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {user.isActive
                              ? "Activa"
                              : "Inactiva"}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-right">
                          {isProtected ? (
                            <span className="text-sm font-semibold text-slate-400">
                              Protegido
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                void handleStatusChange(user)
                              }
                              disabled={isUpdating}
                              className={`inline-flex min-h-10 items-center justify-center rounded-xl px-4 text-sm font-bold transition disabled:opacity-60 ${
                                user.isActive
                                  ? "border border-red-200 text-red-600 hover:bg-red-50"
                                  : "bg-emerald-600 text-white hover:bg-emerald-700"
                              }`}
                            >
                              {isUpdating
                                ? "Guardando..."
                                : user.isActive
                                  ? "Desactivar"
                                  : "Activar"}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}