import {
  AlertCircle,
  CheckCircle2,
  KeyRound,
  Link2,
  LoaderCircle,
  LogOut,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import { Navigate } from "react-router";

import { useAuth } from "../context/AuthContext";
import {
  getCurrentUserProviders,
  linkGoogleToCurrentUser,
  linkPasswordToCurrentUser,
  logoutUser,
} from "../services/auth.service";
import { getUserRoleLabel } from "../types/auth.types";

function getAuthErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Ocurrió un error inesperado. Inténtalo nuevamente.";
  }

  const errorCode =
    "code" in error && typeof error.code === "string"
      ? error.code
      : "";

  switch (errorCode) {
    case "auth/popup-closed-by-user":
      return "Cerraste la ventana de Google antes de terminar.";

    case "auth/popup-blocked":
      return "El navegador bloqueó la ventana de Google. Habilita las ventanas emergentes.";

    case "auth/cancelled-popup-request":
      return "La vinculación con Google fue cancelada.";

    case "auth/credential-already-in-use":
      return "Esta cuenta de Google ya está vinculada a otro usuario.";

    case "auth/provider-already-linked":
      return "Este método de acceso ya está vinculado a tu cuenta.";

    case "auth/email-already-in-use":
      return "Este correo ya está asociado a otra cuenta con contraseña.";

    case "auth/weak-password":
      return "La contraseña debe tener por lo menos 6 caracteres.";

    case "auth/requires-recent-login":
      return "Por seguridad, cierra sesión, vuelve a ingresar e intenta nuevamente.";

    default:
      return error.message || "No fue posible completar la operación.";
  }
}

export default function AccountPage() {
  const { user, isLoading } = useAuth();

  const [providers, setProviders] = useState<string[]>([]);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] =
    useState("");

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLinkingGoogle, setIsLinkingGoogle] =
    useState(false);
  const [isLinkingPassword, setIsLinkingPassword] =
    useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user) {
      setProviders(getCurrentUserProviders());
    }
  }, [user]);

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

  const hasGoogleProvider = providers.includes("google.com");
  const hasPasswordProvider = providers.includes("password");

  const clearMessages = () => {
    setSuccessMessage("");
    setErrorMessage("");
  };

  const refreshProviders = () => {
    setProviders(getCurrentUserProviders());
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logoutUser();
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleLinkGoogle = async () => {
    clearMessages();
    setIsLinkingGoogle(true);

    try {
      await linkGoogleToCurrentUser();
      refreshProviders();

      setSuccessMessage(
        "Google fue vinculado correctamente. Ya puedes iniciar sesión con cualquiera de los dos métodos."
      );
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsLinkingGoogle(false);
    }
  };

  const handleLinkPassword = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    clearMessages();

    if (password.length < 6) {
      setErrorMessage(
        "La contraseña debe tener por lo menos 6 caracteres."
      );
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    setIsLinkingPassword(true);

    try {
      await linkPasswordToCurrentUser(password);
      refreshProviders();

      setPassword("");
      setPasswordConfirmation("");

      setSuccessMessage(
        "La contraseña fue creada correctamente. Ya puedes iniciar sesión con Google o con correo y contraseña."
      );
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsLinkingPassword(false);
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

                <p className="mt-1 text-slate-500">
                  {user.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-red-200 px-5 font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                <LogOut className="h-5 w-5" />
              )}

              Cerrar sesión
            </button>
          </div>

          {successMessage && (
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

              <p className="font-semibold">
                {successMessage}
              </p>
            </div>
          )}

          {errorMessage && (
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

              <p className="font-semibold">
                {errorMessage}
              </p>
            </div>
          )}

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <ShieldCheck className="h-7 w-7 text-emerald-600" />

              <p className="mt-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                Rol
              </p>

              <p className="mt-1 text-xl font-black text-slate-950">
                {getUserRoleLabel(user.role)}
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <UserRound className="h-7 w-7 text-blue-600" />

              <p className="mt-4 text-sm font-bold uppercase tracking-wider text-slate-500">
                Estado
              </p>

              <p className="mt-1 text-xl font-black text-emerald-700">
                {user.isActive
                  ? "Cuenta activa"
                  : "Cuenta inactiva"}
              </p>
            </article>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-10">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                Seguridad
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Métodos de inicio de sesión
              </h2>

              <p className="mt-2 leading-7 text-slate-600">
                Vincula Google y una contraseña para entrar a la
                misma cuenta usando cualquiera de los dos métodos.
              </p>
            </div>

            <div className="mt-7 grid gap-6 lg:grid-cols-2">
              <article className="rounded-3xl border border-slate-200 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <Link2 className="h-6 w-6" />
                  </div>

                  {hasGoogleProvider && (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-700">
                      Vinculado
                    </span>
                  )}
                </div>

                <h3 className="mt-5 text-xl font-black text-slate-950">
                  Cuenta de Google
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  Inicia sesión rápidamente con tu cuenta de
                  Google sin escribir una contraseña.
                </p>

                {hasGoogleProvider ? (
                  <div className="mt-6 flex items-center gap-2 font-bold text-emerald-700">
                    <CheckCircle2 className="h-5 w-5" />
                    Google está conectado
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleLinkGoogle}
                    disabled={isLinkingGoogle}
                    className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isLinkingGoogle ? (
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                    ) : (
                      <Link2 className="h-5 w-5" />
                    )}

                    Vincular Google
                  </button>
                )}
              </article>

              <article className="rounded-3xl border border-slate-200 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                    <KeyRound className="h-6 w-6" />
                  </div>

                  {hasPasswordProvider && (
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-700">
                      Configurada
                    </span>
                  )}
                </div>

                <h3 className="mt-5 text-xl font-black text-slate-950">
                  Correo y contraseña
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  Crea una contraseña para iniciar sesión con el
                  correo asociado a esta cuenta.
                </p>

                {hasPasswordProvider ? (
                  <div className="mt-6 flex items-center gap-2 font-bold text-emerald-700">
                    <CheckCircle2 className="h-5 w-5" />
                    Contraseña configurada
                  </div>
                ) : (
                  <form
                    onSubmit={handleLinkPassword}
                    className="mt-6 space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="new-password"
                        className="mb-2 block text-sm font-bold text-slate-700"
                      >
                        Nueva contraseña
                      </label>

                      <input
                        id="new-password"
                        type="password"
                        value={password}
                        onChange={(event) =>
                          setPassword(event.target.value)
                        }
                        autoComplete="new-password"
                        minLength={6}
                        required
                        placeholder="Mínimo 6 caracteres"
                        className="min-h-12 w-full rounded-2xl border border-slate-300 px-4 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="confirm-password"
                        className="mb-2 block text-sm font-bold text-slate-700"
                      >
                        Confirmar contraseña
                      </label>

                      <input
                        id="confirm-password"
                        type="password"
                        value={passwordConfirmation}
                        onChange={(event) =>
                          setPasswordConfirmation(
                            event.target.value
                          )
                        }
                        autoComplete="new-password"
                        minLength={6}
                        required
                        placeholder="Repite la contraseña"
                        className="min-h-12 w-full rounded-2xl border border-slate-300 px-4 text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isLinkingPassword}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 font-bold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isLinkingPassword ? (
                        <LoaderCircle className="h-5 w-5 animate-spin" />
                      ) : (
                        <KeyRound className="h-5 w-5" />
                      )}

                      Crear contraseña
                    </button>
                  </form>
                )}
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}