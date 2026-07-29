import { FirebaseError } from "firebase/app";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import {
  loginWithGoogle,
  registerWithEmail,
} from "../services/auth.service";

function getRegisterErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return "Ocurrió un error inesperado. Inténtalo nuevamente.";
  }

  switch (error.code) {
    case "auth/email-already-in-use":
      return "Ya existe una cuenta registrada con este correo.";

    case "auth/invalid-email":
      return "El correo electrónico no es válido.";

    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";

    case "auth/popup-closed-by-user":
      return "La ventana de Google se cerró antes de completar el registro.";

    case "auth/popup-blocked":
      return "El navegador bloqueó la ventana de Google.";

    case "auth/network-request-failed":
      return "No fue posible conectar con Firebase.";

    default:
      return "No fue posible crear la cuenta. Inténtalo nuevamente.";
  }
}

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] =
    useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setErrorMessage("");

    if (name.trim().length < 2) {
      setErrorMessage("Escribe tu nombre completo.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        "La contraseña debe tener al menos 6 caracteres.",
      );
      return;
    }

    if (password !== passwordConfirmation) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    setIsSubmitting(true);

    try {
      await registerWithEmail(
        name.trim(),
        email.trim(),
        password,
      );

      navigate("/mi-cuenta");
    } catch (error) {
      setErrorMessage(getRegisterErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
    setErrorMessage("");
    setIsGoogleLoading(true);

    try {
      await loginWithGoogle();
      navigate("/mi-cuenta");
    } catch (error) {
      setErrorMessage(getRegisterErrorMessage(error));
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <section className="min-h-[75vh] bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl sm:p-9">
          <div className="text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
              VIVE+COLOMBIA
            </p>

            <h1 className="mt-3 text-3xl font-black text-slate-950">
              Crea tu cuenta
            </h1>

            <p className="mt-3 leading-7 text-slate-600">
              Guarda lugares, rutas y experiencias favoritas.
            </p>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
            >
              {errorMessage}
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={isGoogleLoading || isSubmitting}
            className="mt-7 flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 px-5 font-bold text-slate-800 transition hover:border-blue-400 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGoogleLoading ? (
              <LoaderCircle className="h-5 w-5 animate-spin" />
            ) : (
              <span className="text-xl font-black text-blue-600">G</span>
            )}

            Registrarme con Google
          </button>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              O con correo
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label
                htmlFor="register-name"
                className="text-sm font-bold text-slate-700"
              >
                Nombre completo
              </label>

              <div className="mt-2 flex min-h-14 items-center gap-3 rounded-2xl border border-slate-300 px-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                <UserRound className="h-5 w-5 text-slate-400" />

                <input
                  id="register-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Tu nombre"
                  autoComplete="name"
                  required
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="register-email"
                className="text-sm font-bold text-slate-700"
              >
                Correo electrónico
              </label>

              <div className="mt-2 flex min-h-14 items-center gap-3 rounded-2xl border border-slate-300 px-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                <Mail className="h-5 w-5 text-slate-400" />

                <input
                  id="register-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="correo@ejemplo.com"
                  autoComplete="email"
                  required
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="text-sm font-bold text-slate-700"
              >
                Contraseña
              </label>

              <div className="mt-2 flex min-h-14 items-center gap-3 rounded-2xl border border-slate-300 px-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                <LockKeyhole className="h-5 w-5 text-slate-400" />

                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  className="w-full bg-transparent outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="text-slate-400 transition hover:text-blue-600"
                  aria-label={
                    showPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
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

            <div>
              <label
                htmlFor="register-password-confirmation"
                className="text-sm font-bold text-slate-700"
              >
                Confirmar contraseña
              </label>

              <div className="mt-2 flex min-h-14 items-center gap-3 rounded-2xl border border-slate-300 px-4 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                <LockKeyhole className="h-5 w-5 text-slate-400" />

                <input
                  id="register-password-confirmation"
                  type={showPassword ? "text" : "password"}
                  value={passwordConfirmation}
                  onChange={(event) =>
                    setPasswordConfirmation(event.target.value)
                  }
                  placeholder="Repite tu contraseña"
                  autoComplete="new-password"
                  minLength={6}
                  required
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isGoogleLoading}
              className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 font-bold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              )}

              Crear cuenta
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-600">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/iniciar-sesion"
              className="font-black text-blue-600 hover:text-blue-500"
            >
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}