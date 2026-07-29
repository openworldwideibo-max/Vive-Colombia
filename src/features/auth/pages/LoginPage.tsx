import { FirebaseError } from "firebase/app";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";

import {
  loginWithEmail,
  loginWithGoogle,
} from "../services/auth.service";

function getAuthErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return "Ocurrió un error inesperado. Inténtalo nuevamente.";
  }

  switch (error.code) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "El correo o la contraseña son incorrectos.";

    case "auth/invalid-email":
      return "El correo electrónico no es válido.";

    case "auth/user-disabled":
      return "Esta cuenta se encuentra deshabilitada.";

    case "auth/popup-closed-by-user":
      return "La ventana de Google se cerró antes de completar el acceso.";

    case "auth/popup-blocked":
      return "El navegador bloqueó la ventana de Google.";

    case "auth/network-request-failed":
      return "No fue posible conectar con Firebase.";

    default:
      return "No fue posible iniciar sesión.";
  }
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      navigate("/mi-cuenta");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setGoogleLoading(true);

    try {
      await loginWithGoogle();
      navigate("/mi-cuenta");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-center text-3xl font-black">
          Iniciar sesión
        </h1>

        <p className="mt-3 text-center text-slate-600">
          Bienvenido nuevamente a VIVE+COLOMBIA
        </p>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl bg-red-100 p-3 text-red-700"
          >
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="mt-6 w-full rounded-xl border p-3 font-bold transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {googleLoading ? (
            <LoaderCircle className="mx-auto h-5 w-5 animate-spin" />
          ) : (
            "Continuar con Google"
          )}
        </button>

        <div className="my-6 text-center text-slate-400">
          o
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="login-email"
              className="font-semibold"
            >
              Correo electrónico
            </label>

            <div className="mt-2 flex items-center gap-2 rounded-xl border px-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <Mail className="h-5 w-5 shrink-0 text-slate-400" />

              <input
                id="login-email"
                type="email"
                required
                autoComplete="email"
                placeholder="correo@ejemplo.com"
                className="h-12 w-full bg-transparent outline-none"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="font-semibold"
            >
              Contraseña
            </label>

            <div className="mt-2 flex items-center gap-2 rounded-xl border px-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
              <LockKeyhole className="h-5 w-5 shrink-0 text-slate-400" />

              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Escribe tu contraseña"
                className="h-12 w-full bg-transparent outline-none"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                aria-label={
                  showPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
                className="rounded-lg p-1 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="text-right">
            <Link
              to="/recuperar-contrasena"
              className="text-sm font-bold text-blue-600 transition hover:text-blue-500"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <LoaderCircle className="mx-auto h-5 w-5 animate-spin" />
            ) : (
              "Iniciar sesión"
            )}
          </button>
        </form>

        <p className="mt-6 text-center">
          ¿No tienes cuenta?{" "}
          <Link
            to="/registro"
            className="font-bold text-blue-600 transition hover:text-blue-500"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </section>
  );
}