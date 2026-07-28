import { Search, ShoppingBag, Store } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Café colombiano de origen",
    category: "Gastronomía",
    seller: "Productores de Colombia",
  },
  {
    id: 2,
    name: "Artesanía tradicional",
    category: "Artesanías",
    seller: "Manos colombianas",
  },
  {
    id: 3,
    name: "Experiencia gastronómica",
    category: "Experiencias",
    seller: "Sabores locales",
  },
];

export default function Marketplace() {
  return (
    <section className="min-h-[75vh] bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Marketplace VIVE+
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Compra productos y experiencias de Colombia
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Conecta con emprendedores, productores, artesanos y operadores
            turísticos de diferentes regiones.
          </p>
        </div>

        <div className="mt-10 flex max-w-3xl items-center gap-3 rounded-2xl border border-slate-200 px-4 shadow-sm">
          <Search className="h-5 w-5 text-slate-400" />

          <input
            type="search"
            placeholder="Buscar productos o experiencias..."
            className="min-h-14 w-full outline-none"
          />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-52 items-center justify-center bg-slate-100">
                <ShoppingBag className="h-16 w-16 text-slate-300" />
              </div>

              <div className="p-6">
                <span className="text-sm font-bold text-blue-600">
                  {product.category}
                </span>

                <h2 className="mt-2 text-xl font-black text-slate-950">
                  {product.name}
                </h2>

                <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                  <Store className="h-4 w-4" />
                  {product.seller}
                </p>

                <button
                  type="button"
                  className="mt-6 w-full rounded-2xl bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-blue-600"
                >
                  Ver producto
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}