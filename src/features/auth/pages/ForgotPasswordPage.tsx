import { FirebaseError } from "firebase/app";
import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  Mail,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router";

import { resetPassword } from "../services/auth.service";

function getResetErrorMessage(error: unknown) {
  if (!(error instanceof FirebaseError)) {
    return "Ocurrió un error inesperado. Inténtalo nuevamente.";
  }

  switch (error.code) {
    case "auth/invalid-email":
      return "El correo electrónico no es válido.";

    case "auth/user-disabled":
      return "Esta cuenta está deshabilitada.";

    case "auth/network-request-failed":
      return "No fue posible conectarse a Firebase.";

    case "auth/too-many-requests":
      return "Demasiados intentos. Intenta nuevamente en unos minutos.";

    default:
      return "No fue posible enviar el correo de recuperación.";
  }
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await resetPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(getResetErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <div className="text-center">
          <p className="text-sm font-black tracking-[0.2em] text-blue-600 uppercase">
            VIVE+COLOMBIA
          </p>

          <h1 className="mt-4 text-3xl font-black">
            Recuperar contraseña
          </h1>

          <p className="mt-3 text-slate-600">
            Escribe el correo asociado a tu cuenta.
            Te enviaremos un enlace para crear
            una nueva contraseña.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl bg-red-100 p-4 text-red-700 font-semibold">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-xl bg-green-100 p-4 text-green-700">

            <div className="flex items-start gap-3">

              <CheckCircle2 className="mt-1 h-6 w-6" />

              <div>

                <p className="font-bold">
                  Correo enviado
                </p>

                <p className="text-sm mt-1">
                  Si existe una cuenta con ese correo,
                  recibirás un enlace para restablecer
                  tu contraseña.
                </p>

              </div>

            </div>

          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
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
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

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
              "Enviar enlace"
            )}
          </button>

        </form>

        <Link
          to="/iniciar-sesion"
          className="mt-8 flex items-center justify-center gap-2 text-blue-600 font-bold hover:text-blue-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio de sesión
        </Link>

      </div>
    </section>
  );
}