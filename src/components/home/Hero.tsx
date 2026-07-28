import {
  Bot,
  CalendarDays,
  LocateFixed,
  Map,
  Search,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";

const quickActions = [
  {
    title: "Explorar el mapa",
    description: "Encuentra lugares y experiencias cerca de ti.",
    icon: Map,
    to: "/mapa",
  },
  {
    title: "Eventos de hoy",
    description: "Descubre actividades y planes para disfrutar.",
    icon: CalendarDays,
    to: "/eventos",
  },
  {
    title: "Pregúntale a ANDES",
    description: "Recibe recomendaciones personalizadas con IA.",
    icon: Bot,
    to: "/andes",
  },
];

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanSearchTerm = searchTerm.trim();

    if (!cleanSearchTerm) {
      navigate("/explorar");
      return;
    }

    navigate(`/explorar?busqueda=${encodeURIComponent(cleanSearchTerm)}`);
  };

  const handleSurpriseMe = () => {
    navigate("/explorar?modo=sorpresa");
  };

  const handleNearMe = () => {
    navigate("/mapa?cerca=true");
  };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-slate-950 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.28),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.14),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold text-blue-100 backdrop-blur">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            Bogotá, Cundinamarca y toda Colombia
          </div>

          <h1 className="mt-8 text-4xl font-black tracking-tight sm:text-5xl lg:text-7xl">
            Descubre Colombia
            <span className="block text-blue-400">como nunca antes.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Encuentra lugares, rutas, eventos, gastronomía y experiencias
            auténticas para vivir lo mejor de cada región del país.
          </p>

          <form
            className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 rounded-3xl border border-white/10 bg-white p-3 shadow-2xl sm:flex-row"
            onSubmit={handleSearch}
          >
            <label className="flex min-h-14 flex-1 items-center gap-3 px-3">
              <Search className="h-5 w-5 shrink-0 text-slate-400" />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Busca lugares, ciudades, eventos o experiencias..."
                className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                aria-label="Buscar lugares, ciudades, eventos o experiencias"
              />
            </label>

            <button
              type="submit"
              className="min-h-14 rounded-2xl bg-blue-600 px-8 font-bold text-white transition hover:bg-blue-500"
            >
              Explorar
            </button>
          </form>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={handleSurpriseMe}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white hover:text-slate-950"
            >
              <Sparkles className="h-4 w-4" />
              Sorpréndeme
            </button>

            <button
              type="button"
              onClick={handleNearMe}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold transition hover:bg-white hover:text-slate-950"
            >
              <LocateFixed className="h-4 w-4" />
              Cerca de mí
            </button>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                to={action.to}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <h2 className="mt-5 text-xl font-black">{action.title}</h2>

                <p className="mt-2 leading-7 text-slate-300">
                  {action.description}
                </p>

                <span className="mt-5 inline-block text-sm font-bold text-blue-300">
                  Descubrir →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}