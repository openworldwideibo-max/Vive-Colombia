import { ArrowLeft, MapPinOff } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6 py-16">
      <div className="max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
          <MapPinOff className="h-10 w-10" />
        </div>

        <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-blue-600">
          Error 404
        </p>

        <h1 className="mt-3 text-4xl font-black text-slate-950">
          Esta ruta no existe
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-600">
          La página que estás buscando fue movida, eliminada o todavía no ha
          sido creada.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-500"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}