import {
  LoaderCircle,
  LogOut,
  Menu,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import {
  logoutUser,
  useAuth,
} from "../../features/auth";

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
  const { user, isLoading, isAuthenticated } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logoutUser();
      closeMenu();
    } catch (error) {
      console.error("No fue posible cerrar sesión:", error);
    } finally {
      setIsLoggingOut(false);
    }
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
          {isLoading ? (
            <div className="flex h-12 items-center px-5">
              <LoaderCircle className="h-5 w-5 animate-spin text-blue-600" />
            </div>
          ) : isAuthenticated && user ? (
            <>
              <Link
                to="/mi-cuenta"
                className="inline-flex items-center gap-3 rounded-full border border-slate-300 px-4 py-2 transition hover:border-blue-600"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName ?? "Usuario"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <UserRound className="h-4 w-4" />
                  </div>
                )}

                <span className="max-w-32 truncate text-sm font-bold text-slate-800">
                  {user.displayName ?? "Mi cuenta"}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-red-200 text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                aria-label="Cerrar sesión"
              >
                {isLoggingOut ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <LogOut className="h-5 w-5" />
                )}
              </button>
            </>
          ) : (
            <Link
              to="/iniciar-sesion"
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-600 hover:text-blue-600"
            >
              <UserRound className="h-4 w-4" />
              Iniciar sesión
            </Link>
          )}

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

            {isLoading ? (
              <div className="mt-6 flex justify-center">
                <LoaderCircle className="h-6 w-6 animate-spin text-blue-600" />
              </div>
            ) : isAuthenticated && user ? (
              <>
                <Link
                  to="/mi-cuenta"
                  onClick={closeMenu}
                  className="mt-6 flex items-center gap-3 rounded-2xl border border-slate-300 px-5 py-4 font-bold text-slate-800"
                >
                  <UserRound className="h-5 w-5 text-blue-600" />
                  {user.displayName ?? "Mi cuenta"}
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="mt-3 inline-flex items-center justify-center gap-2 rounded-2xl border border-red-200 px-5 py-3 font-bold text-red-600"
                >
                  {isLoggingOut ? (
                    <LoaderCircle className="h-5 w-5 animate-spin" />
                  ) : (
                    <LogOut className="h-5 w-5" />
                  )}

                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                to="/iniciar-sesion"
                onClick={closeMenu}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 px-5 py-3 font-bold text-slate-800"
              >
                <UserRound className="h-5 w-5" />
                Iniciar sesión
              </Link>
            )}

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