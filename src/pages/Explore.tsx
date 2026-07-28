import {
  Building2,
  Camera,
  Landmark,
  MoonStar,
  Mountain,
  Search,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router";

const categories = [
  {
    name: "Naturaleza",
    slug: "naturaleza",
    icon: Mountain,
    description: "Parques, montañas, cascadas y paisajes.",
  },
  {
    name: "Gastronomía",
    slug: "gastronomia",
    icon: UtensilsCrossed,
    description: "Restaurantes, mercados y sabores tradicionales.",
  },
  {
    name: "Cultura",
    slug: "cultura",
    icon: Camera,
    description: "Arte, música, festivales y tradiciones.",
  },
  {
    name: "Historia",
    slug: "historia",
    icon: Landmark,
    description: "Museos, monumentos y lugares históricos.",
  },
  {
    name: "Arquitectura",
    slug: "arquitectura",
    icon: Building2,
    description: "Barrios, edificios y espacios emblemáticos.",
  },
  {
    name: "Vida nocturna",
    slug: "vida-nocturna",
    icon: MoonStar,
    description: "Bares, discotecas, música y experiencias nocturnas.",
  },
];

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchFromUrl = searchParams.get("busqueda") ?? "";
  const selectedCategory = searchParams.get("categoria") ?? "";
  const surpriseMode = searchParams.get("modo") === "sorpresa";

  const [searchTerm, setSearchTerm] = useState(searchFromUrl);

  useEffect(() => {
    setSearchTerm(searchFromUrl);
  }, [searchFromUrl]);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanSearchTerm = searchTerm.trim();

    if (!cleanSearchTerm) {
      setSearchParams({});
      return;
    }

    setSearchParams({
      busqueda: cleanSearchTerm,
    });
  };

  const handleCategory = (categorySlug: string) => {
    setSearchParams({
      categoria: categorySlug,
    });
  };

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

        <form
          onSubmit={handleSearch}
          className="mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row"
        >
          <label className="flex min-h-14 flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm">
            <Search className="h-5 w-5 shrink-0 text-slate-400" />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="¿Qué quieres descubrir?"
              className="w-full outline-none"
              aria-label="Buscar experiencias"
            />
          </label>

          <button
            type="submit"
            className="min-h-14 rounded-2xl bg-blue-600 px-7 font-bold text-white transition hover:bg-blue-500"
          >
            Buscar
          </button>
        </form>

        {searchFromUrl && (
          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Resultado de búsqueda
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Buscando experiencias relacionadas con “{searchFromUrl}”
            </h2>

            <p className="mt-2 text-slate-600">
              Cuando conectemos Firebase, aquí aparecerán los lugares, eventos
              y experiencias que coincidan con tu búsqueda.
            </p>
          </div>
        )}

        {surpriseMode && (
          <div className="mt-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white shadow-lg">
            <div className="flex items-center gap-3">
              <Sparkles className="h-7 w-7 text-yellow-300" />

              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-blue-100">
                  Recomendación sorpresa
                </p>

                <h2 className="mt-1 text-2xl font-black">
                  Una aventura inesperada te espera
                </h2>
              </div>
            </div>

            <p className="mt-4 max-w-3xl leading-7 text-blue-100">
              Más adelante ANDES seleccionará automáticamente un lugar o una
              experiencia según tu ubicación, preferencias y tiempo disponible.
            </p>
          </div>
        )}

        {selectedCategory && (
          <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">
              Categoría seleccionada
            </p>

            <h2 className="mt-2 text-2xl font-black capitalize text-slate-950">
              {selectedCategory.replaceAll("-", " ")}
            </h2>
          </div>
        )}

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.slug;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => handleCategory(category.slug)}
                className={[
                  "rounded-3xl border bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl",
                  isSelected
                    ? "border-blue-500 ring-4 ring-blue-100"
                    : "border-slate-200",
                ].join(" ")}
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

                <span className="mt-5 inline-block font-bold text-blue-600">
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