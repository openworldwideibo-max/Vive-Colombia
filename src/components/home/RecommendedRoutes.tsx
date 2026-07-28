import { Clock3, MapPin, Route, Star, Users } from "lucide-react";

const routes = [
  {
    id: 1,
    title: "Bogotá histórica y cultural",
    city: "Bogotá",
    duration: "6 horas",
    stops: 5,
    rating: 4.9,
    audience: "Parejas y viajeros culturales",
    description:
      "Recorre La Candelaria, el Museo del Oro, la Plaza de Bolívar y termina con una vista desde Monserrate.",
  },
  {
    id: 2,
    title: "Sabores tradicionales de Medellín",
    city: "Medellín",
    duration: "4 horas",
    stops: 4,
    rating: 4.8,
    audience: "Amantes de la gastronomía",
    description:
      "Descubre mercados, cocina paisa, cafés locales y lugares tradicionales recomendados por habitantes de la ciudad.",
  },
  {
    id: 3,
    title: "Cartagena al atardecer",
    city: "Cartagena",
    duration: "5 horas",
    stops: 6,
    rating: 4.9,
    audience: "Parejas y fotógrafos",
    description:
      "Camina por Getsemaní, la Ciudad Amurallada y termina viendo el atardecer desde las murallas.",
  },
];

export default function RecommendedRoutes() {
  return (
    <section id="mapa" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Rutas VIVE+
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Planes completos para descubrir Colombia
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Sigue recorridos organizados por tiempo, ubicación e intereses.
            </p>
          </div>

          <button
            type="button"
            className="self-start rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-600 hover:text-blue-600 md:self-auto"
          >
            Explorar todas las rutas
          </button>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {routes.map((route) => (
            <article
              key={route.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Route className="h-6 w-6" />
                </div>

                <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700">
                  <Star className="h-4 w-4 fill-current" />
                  {route.rating}
                </div>
              </div>

              <h3 className="mt-6 text-2xl font-black leading-tight text-slate-950">
                {route.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {route.description}
              </p>

              <div className="mt-6 space-y-3 border-t border-slate-200 pt-6 text-sm text-slate-600">
                <p className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  {route.city}
                </p>

                <p className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-blue-600" />
                  {route.duration}
                </p>

                <p className="flex items-center gap-3">
                  <Route className="h-5 w-5 text-blue-600" />
                  {route.stops} paradas
                </p>

                <p className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  {route.audience}
                </p>
              </div>

              <button
                type="button"
                className="mt-7 w-full rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-blue-600"
              >
                Ver ruta completa
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}