import {
  Building2,
  Camera,
  Landmark,
  MoonStar,
  Mountain,
  UtensilsCrossed,
} from "lucide-react";

const categories = [
  {
    name: "Naturaleza",
    description: "Montañas, parques, cascadas y paisajes inolvidables.",
    icon: Mountain,
  },
  {
    name: "Gastronomía",
    description: "Sabores locales, restaurantes y cocinas tradicionales.",
    icon: UtensilsCrossed,
  },
  {
    name: "Cultura",
    description: "Arte, música, tradiciones y expresiones colombianas.",
    icon: Camera,
  },
  {
    name: "Historia",
    description: "Monumentos, museos y lugares con memoria.",
    icon: Landmark,
  },
  {
    name: "Arquitectura",
    description: "Barrios, edificios y espacios emblemáticos.",
    icon: Building2,
  },
  {
    name: "Vida nocturna",
    description: "Bares, música, fiestas y planes para la noche.",
    icon: MoonStar,
  },
];

export default function Categories() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Explora por categorías
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Encuentra experiencias para cada forma de viajar
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Descubre Colombia según tus intereses, tu tiempo y el tipo de
            aventura que quieras vivir.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                type="button"
                className="group rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-950">
                  {category.name}
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  {category.description}
                </p>

                <span className="mt-5 inline-block text-sm font-bold text-blue-600">
                  Explorar categoría →
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}