import {
  Building2,
  Camera,
  Landmark,
  MoonStar,
  Mountain,
  Search,
  UtensilsCrossed,
} from "lucide-react";

const categories = [
  {
    name: "Naturaleza",
    icon: Mountain,
    description: "Parques, montañas, cascadas y paisajes.",
  },
  {
    name: "Gastronomía",
    icon: UtensilsCrossed,
    description: "Restaurantes, mercados y sabores tradicionales.",
  },
  {
    name: "Cultura",
    icon: Camera,
    description: "Arte, música, festivales y tradiciones.",
  },
  {
    name: "Historia",
    icon: Landmark,
    description: "Museos, monumentos y lugares históricos.",
  },
  {
    name: "Arquitectura",
    icon: Building2,
    description: "Barrios, edificios y espacios emblemáticos.",
  },
  {
    name: "Vida nocturna",
    icon: MoonStar,
    description: "Bares, discotecas, música y experiencias nocturnas.",
  },
];

export default function Explore() {
  return (
    <section className="min-h-[75vh] bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Explorar Colombia
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Encuentra experiencias para cada tipo de viajero
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Explora lugares y actividades según tus gustos, ubicación y tiempo
            disponible.
          </p>
        </div>

        <div className="mt-10 flex max-w-3xl items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm">
          <Search className="h-5 w-5 text-slate-400" />

          <input
            type="search"
            placeholder="¿Qué quieres descubrir?"
            className="min-h-14 w-full outline-none"
          />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <article
                key={category.name}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="h-6 w-6" />
                </div>

                <h2 className="mt-5 text-xl font-black text-slate-950">
                  {category.name}
                </h2>

                <p className="mt-2 leading-7 text-slate-600">
                  {category.description}
                </p>

                <button
                  type="button"
                  className="mt-5 font-bold text-blue-600 hover:text-blue-500"
                >
                  Explorar categoría →
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}