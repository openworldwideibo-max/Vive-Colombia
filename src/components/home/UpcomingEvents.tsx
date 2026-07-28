import { CalendarDays, Clock3, MapPin } from "lucide-react";

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

export default function UpcomingEvents() {
  return (
    <section id="eventos" className="bg-slate-950 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">
              Agenda Colombia
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Eventos que están por comenzar
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-300">
              Descubre conciertos, ferias, recorridos y experiencias para
              disfrutar en diferentes ciudades del país.
            </p>
          </div>

          <button
            type="button"
            className="self-start rounded-full border border-white/20 px-5 py-3 text-sm font-bold transition hover:bg-white hover:text-slate-950 md:self-auto"
          >
            Ver agenda completa
          </button>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {events.map((event) => (
            <article
              key={event.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:-translate-y-1 hover:bg-white/10"
            >
              <span className="inline-flex rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
                {event.category}
              </span>

              <h3 className="mt-5 text-2xl font-black leading-tight">
                {event.title}
              </h3>

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