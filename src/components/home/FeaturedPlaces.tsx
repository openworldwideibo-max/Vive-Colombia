import { Heart, MapPin, Star } from "lucide-react";

const places = [
  {
    id: 1,
    name: "Monserrate",
    location: "Bogotá, Cundinamarca",
    category: "Naturaleza y cultura",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1596395819057-e37f55a8516b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Guatapé",
    location: "Antioquia",
    category: "Pueblos y aventura",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1596813362035-3edcff0c2487?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Ciudad Amurallada",
    location: "Cartagena, Bolívar",
    category: "Historia y arquitectura",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1583531352515-8884af319dc1?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function FeaturedPlaces() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Lugares destacados
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Destinos que debes vivir
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Explora algunos de los lugares más representativos y mejor
              valorados de Colombia.
            </p>
          </div>

          <button
            type="button"
            className="self-start rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-600 hover:text-blue-600 md:self-auto"
          >
            Ver todos los lugares
          </button>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {places.map((place) => (
            <article
              key={place.id}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <button
                  type="button"
                  aria-label={`Guardar ${place.name} en favoritos`}
                  className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-md backdrop-blur transition hover:text-rose-600"
                >
                  <Heart className="h-5 w-5" />
                </button>

                <span className="absolute bottom-4 left-4 rounded-full bg-slate-950/75 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                  {place.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-950">
                      {place.name}
                    </h3>

                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="h-4 w-4" />
                      {place.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700">
                    <Star className="h-4 w-4 fill-current" />
                    {place.rating}
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-blue-600"
                >
                  Ver experiencia
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}