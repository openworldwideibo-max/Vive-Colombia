import {
  Bot,
  MapPin,
  MessageCircle,
  Route,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

const suggestions = [
  {
    icon: Route,
    title: "Plan de un día",
    description: "Crea una ruta completa según tu tiempo y ubicación.",
  },
  {
    icon: UtensilsCrossed,
    title: "Dónde comer",
    description: "Encuentra sabores locales según tu presupuesto.",
  },
  {
    icon: MapPin,
    title: "Cerca de mí",
    description: "Descubre lugares y experiencias a pocos minutos.",
  },
];

export default function AndesAssistant() {
  return (
    <section id="andes" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-950 text-white shadow-2xl">
          <div className="grid gap-10 px-6 py-10 md:px-10 lg:grid-cols-[1fr_0.9fr] lg:px-14 lg:py-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
                <Sparkles className="h-4 w-4 text-yellow-300" />
                Inteligencia turística colombiana
              </div>

              <h2 className="mt-6 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
                Pregúntale a ANDES
              </h2>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
                Tu guía inteligente para descubrir rutas, gastronomía,
                naturaleza, eventos, cultura y experiencias personalizadas en
                Colombia.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {suggestions.map((suggestion) => {
                  const Icon = suggestion.icon;

                  return (
                    <article
                      key={suggestion.title}
                      className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur"
                    >
                      <Icon className="h-6 w-6 text-cyan-300" />

                      <h3 className="mt-4 font-black">{suggestion.title}</h3>

                      <p className="mt-2 text-sm leading-6 text-blue-100">
                        {suggestion.description}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white p-5 text-slate-900 shadow-xl">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <Bot className="h-6 w-6" />
                </div>

                <div>
                  <p className="font-black">ANDES</p>
                  <p className="text-sm text-emerald-600">
                    Guía inteligente disponible
                  </p>
                </div>
              </div>

              <div className="space-y-4 py-6">
                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 text-sm leading-6 text-slate-700">
                  ¡Hola! Soy ANDES. Cuéntame dónde estás y qué tipo de plan
                  quieres vivir.
                </div>

                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-3 text-sm leading-6 text-white">
                  Estoy en Bogotá y quiero un plan cultural para esta tarde.
                </div>

                <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 text-sm leading-6 text-slate-700">
                  Te recomiendo una ruta por La Candelaria, Museo del Oro y una
                  terraza con vista al centro histórico.
                </div>
              </div>

              <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <input
                  type="text"
                  placeholder="Escríbele a ANDES..."
                  className="min-h-12 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-slate-400"
                />

                <button
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500"
                  aria-label="Enviar mensaje a ANDES"
                >
                  <MessageCircle className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-3 text-center text-xs text-slate-400">
                Esta es una vista previa. La conversación real se conectará
                después.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}