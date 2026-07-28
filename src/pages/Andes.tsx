import { Bot, MessageCircle, Send, Sparkles } from "lucide-react";

const suggestions = [
  "Crea un plan cultural en Bogotá",
  "Recomiéndame lugares cerca de mí",
  "¿Dónde puedo comer comida típica?",
  "Organiza una ruta para este fin de semana",
];

export default function Andes() {
  return (
    <section className="min-h-[75vh] bg-slate-950 py-16 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600">
            <Bot className="h-8 w-8" />
          </div>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-blue-200">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            Inteligencia turística colombiana
          </div>

          <h1 className="mt-5 text-4xl font-black sm:text-5xl">
            Habla con ANDES
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Cuéntale qué quieres hacer y recibe recomendaciones personalizadas
            para descubrir Colombia.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-white p-5 text-slate-900 shadow-2xl sm:p-7">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-5">
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

          <div className="min-h-64 py-6">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 leading-7 text-slate-700">
              ¡Hola! Soy ANDES. Dime en qué ciudad estás, cuánto tiempo tienes
              y qué tipo de experiencia quieres vivir.
            </div>

            <div className="mt-6">
              <p className="text-sm font-bold text-slate-500">
                También puedes preguntarme:
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <form
            className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2"
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="flex flex-1 items-center gap-3 px-3">
              <MessageCircle className="h-5 w-5 shrink-0 text-slate-400" />

              <input
                type="text"
                placeholder="Escríbele a ANDES..."
                className="min-h-12 w-full bg-transparent outline-none"
              />
            </label>

            <button
              type="submit"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-500"
              aria-label="Enviar mensaje"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>

          <p className="mt-3 text-center text-xs text-slate-400">
            La conexión real con inteligencia artificial se configurará
            posteriormente.
          </p>
        </div>
      </div>
    </section>
  );
}