import { Menu, UserRound, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";

const navigation = [
  {
    name: "Inicio",
    to: "/",
  },
  {
    name: "Mapa",
    to: "/mapa",
  },
  {
    name: "Eventos",
    to: "/eventos",
  },
  {
    name: "Explorar",
    to: "/explorar",
  },
  {
    name: "Marketplace",
    to: "/marketplace",
  },
  {
    name: "ANDES IA",
    to: "/andes",
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6"
        aria-label="Navegación principal"
      >
        <Link
          to="/"
          className="text-xl font-black tracking-tight text-slate-950"
          onClick={closeMenu}
        >
          VIVE
          <span className="text-blue-600">+</span>
          COLOMBIA
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                [
                  "text-sm font-bold transition",
                  isActive
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600",
                ].join(" ")
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-600 hover:text-blue-600"
          >
            <UserRound className="h-4 w-4" />
            Iniciar sesión
          </button>

          <Link
            to="/andes"
            className="rounded-full bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-500"
          >
            Hablar con ANDES
          </Link>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-800 transition hover:border-blue-600 hover:text-blue-600 lg:hidden"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-6 py-6 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                end={item.to === "/"}
                onClick={closeMenu}
                className={({ isActive }) =>
                  [
                    "border-b border-slate-100 py-4 font-bold transition",
                    isActive
                      ? "text-blue-600"
                      : "text-slate-700 hover:text-blue-600",
                  ].join(" ")
                }
              >
                {item.name}
              </NavLink>
            ))}

            <button
              type="button"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 font-bold text-slate-800"
            >
              <UserRound className="h-5 w-5" />
              Iniciar sesión
            </button>

            <Link
              to="/andes"
              onClick={closeMenu}
              className="mt-3 rounded-2xl bg-blue-600 px-5 py-3 text-center font-bold text-white"
            >
              Hablar con ANDES
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}