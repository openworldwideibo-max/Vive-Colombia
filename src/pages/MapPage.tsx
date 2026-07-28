import { LocateFixed, Map, MapPin, Search } from "lucide-react";

export default function MapPage() {
  return (
    <section className="min-h-[75vh] bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Mapa turístico
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
            Explora Colombia desde el mapa
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Encuentra destinos, restaurantes, eventos, alojamientos y
            experiencias según tu ubicación.
          </p>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-[360px_1fr]">
          <aside className="border-b border-slate-200 p-6 lg:border-b-0 lg:border-r">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4">
              <Search className="h-5 w-5 text-slate-400" />

              <input
                type="search"
                placeholder="Buscar en el mapa..."
                className="min-h-14 w-full outline-none"
              />
            </div>

            <button
              type="button"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 font-bold text-white transition hover:bg-blue-500"
            >
              <LocateFixed className="h-5 w-5" />
              Usar mi ubicación
            </button>

            <div className="mt-8">
              <h2 className="font-black text-slate-950">
                Lugares recomendados
              </h2>

              <div className="mt-4 space-y-3">
                {["Monserrate", "Museo del Oro", "Plaza de Bolívar"].map(
                  (place) => (
                    <button
                      key={place}
                      type="button"
                      className="flex w-full items-center gap-3 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                    >
                      <MapPin className="h-5 w-5 text-blue-600" />

                      <span className="font-bold text-slate-800">{place}</span>
                    </button>
                  ),
                )}
              </div>
            </div>
          </aside>

          <div className="flex min-h-[500px] items-center justify-center bg-slate-200 p-8">
            <div className="max-w-md text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-blue-600 shadow-lg">
                <Map className="h-10 w-10" />
              </div>

              <h2 className="mt-6 text-2xl font-black text-slate-950">
                El mapa interactivo se conectará próximamente
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Aquí integraremos los marcadores y la ubicación de los lugares
                almacenados en Firebase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}