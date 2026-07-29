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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
    <section className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="text-3xl font-black text-center">
          Iniciar sesión
        </h1>

        <p className="mt-3 text-center text-slate-600">
          Bienvenido nuevamente a VIVE+COLOMBIA
        </p>

        {error && (
          <div className="mt-6 rounded-xl bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
          className="mt-6 w-full rounded-xl border p-3 font-bold hover:bg-slate-100"
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
            <label className="font-semibold">
              Correo electrónico
            </label>

            <div className="mt-2 flex items-center gap-2 rounded-xl border px-4">
              <Mail className="h-5 w-5 text-slate-400" />

              <input
                type="email"
                required
                className="h-12 w-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="font-semibold">
              Contraseña
            </label>

            <div className="mt-2 flex items-center gap-2 rounded-xl border px-4">
              <LockKeyhole className="h-5 w-5 text-slate-400" />

              <input
                type={showPassword ? "text" : "password"}
                required
                className="h-12 w-full outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3 font-bold text-white hover:bg-blue-500"
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
            className="font-bold text-blue-600"
          >
            Regístrate
          </Link>
        </p>

      </div>
    </section>
  );
}