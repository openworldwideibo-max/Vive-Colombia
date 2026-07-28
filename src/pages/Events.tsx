import { CalendarDays, Clock3, MapPin, Search } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Festival de Música Colombiana",
    date: "12 de agosto",
    time: "6:00 p. m.",
    location: "Bogotá, Cundinamarca",
    category: "Música",
  },
  {
    id: 2,
    title: "Feria Gastronómica Sabores de Colombia",
    date: "18 de agosto",
    time: "11:00 a. m.",
    location: "Medellín, Antioquia",
    category: "Gastronomía",
  },
  {
    id: 3,
    title: "Ruta Nocturna por el Centro Histórico",
    date: "24 de agosto",
    time: "7:30 p. m.",
    location: "Cartagena, Bolívar",
    category: "Historia",
  },
];

export default function Events() {
  return (
    <section className="min-h-[75vh] bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
            Agenda Colombia
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            Eventos y planes para disfrutar
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            Encuentra conciertos, festivales, ferias, recorridos y actividades
            en diferentes ciudades del país.
          </p>
        </div>

        <div className="mt-10 flex max-w-2xl items-center gap-3 rounded-2xl bg-white px-4">
          <Search className="h-5 w-5 text-slate-400" />

          <input
            type="search"
            placeholder="Buscar eventos por nombre o ciudad..."
            className="min-h-14 w-full text-slate-900 outline-none"
          />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10"
            >
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                {event.category}
              </span>

              <h2 className="mt-5 text-2xl font-black">{event.title}</h2>

              <div className="mt-6 space-y-3 text-sm text-slate-300">
                <p className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-sky-300" />
                  {event.date}
                </p>

                <p className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-amber-300" />
                  {event.time}
                </p>

                <p className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-emerald-300" />
                  {event.location}
                </p>
              </div>

              <button
                type="button"
                className="mt-7 w-full rounded-2xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                Ver evento
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}