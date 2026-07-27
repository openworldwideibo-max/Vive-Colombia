import {
  CalendarDays,
  Compass,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-950 to-emerald-950" />

      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
            <MapPin className="h-4 w-4 text-emerald-300" />
            Bogotá, Cundinamarca y toda Colombia
          </div>

          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            Descubre Colombia
            <span className="block bg-gradient-to-r from-sky-300 to-emerald-300 bg-clip-text text-transparent">
              como nunca antes.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Encuentra lugares, eventos, gastronomía, cultura, naturaleza,
            historia y experiencias únicas cerca de ti.
          </p>

          <div className="mt-8 flex max-w-3xl flex-col gap-3 rounded-3xl border border-white/15 bg-white/10 p-3 shadow-2xl backdrop-blur-xl sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-2xl bg-white px-4">
              <Search className="h-5 w-5 text-slate-400" />

              <input
                type="search"
                placeholder="¿Qué quieres descubrir hoy?"
                className="min-h-14 w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>

            <button
              type="button"
              className="min-h-14 rounded-2xl bg-blue-600 px-7 font-bold text-white transition hover:bg-blue-500"
            >
              Explorar
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold transition hover:bg-white/20"
            >
              <Sparkles className="h-4 w-4 text-yellow-300" />
              Sorpréndeme
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold transition hover:bg-white/20"
            >
              <Compass className="h-4 w-4 text-sky-300" />
              Cerca de mí
            </button>
          </div>

          <div className="mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
            <a
              href="#mapa"
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <MapPin className="h-6 w-6 text-sky-300" />
              <h2 className="mt-4 font-bold">Explorar el mapa</h2>
              <p className="mt-1 text-sm text-slate-400">
                Descubre lugares cercanos.
              </p>
            </a>

            <a
              href="#eventos"
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <CalendarDays className="h-6 w-6 text-emerald-300" />
              <h2 className="mt-4 font-bold">Eventos de hoy</h2>
              <p className="mt-1 text-sm text-slate-400">
                Planes, ferias y conciertos.
              </p>
            </a>

            <a
              href="#andes"
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
            >
              <Sparkles className="h-6 w-6 text-yellow-300" />
              <h2 className="mt-4 font-bold">Pregúntale a ANDES</h2>
              <p className="mt-1 text-sm text-slate-400">
                Tu guía inteligente de Colombia.
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}