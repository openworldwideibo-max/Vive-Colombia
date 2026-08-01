import {
  Bot,
  Building2,
  CalendarDays,
  ChevronLeft,
  Compass,
  LayoutDashboard,
  MapPinned,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  Store,
  Truck,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router";

import { useAuth } from "../../auth/context/AuthContext";
import { getUserRoleLabel } from "../../auth/types/auth.types";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/administracion",
    icon: LayoutDashboard,
    end: true,
    available: true,
  },
  {
    label: "Usuarios",
    path: "/administracion/usuarios",
    icon: Users,
    available: true,
  },
  {
    label: "Empresas",
    path: "/administracion/empresas",
    icon: Building2,
    available: true,
  },
  {
    label: "Hoteles",
    path: "/administracion/hoteles",
    icon: Store,
    available: false,
  },
  {
    label: "Restaurantes",
    path: "/administracion/restaurantes",
    icon: UtensilsCrossed,
    available: false,
  },
  {
    label: "Guías",
    path: "/administracion/guias",
    icon: Compass,
    available: false,
  },
  {
    label: "Transporte",
    path: "/administracion/transporte",
    icon: Truck,
    available: false,
  },
  {
    label: "Eventos",
    path: "/administracion/eventos",
    icon: CalendarDays,
    available: false,
  },
  {
    label: "Marketplace",
    path: "/administracion/marketplace",
    icon: ShoppingBag,
    available: false,
  },
  {
    label: "Destinos",
    path: "/administracion/destinos",
    icon: MapPinned,
    available: false,
  },
  {
    label: "Servicios",
    path: "/administracion/servicios",
    icon: Package,
    available: false,
  },
  {
    label: "ANDES IA",
    path: "/administracion/andes",
    icon: Bot,
    available: false,
  },
  {
    label: "Configuración",
    path: "/administracion/configuracion",
    icon: Settings,
    available: false,
  },
];

export default function AdminLayout() {
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Cerrar menú administrativo"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-slate-950 text-white shadow-2xl transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <NavLink
            to="/administracion"
            onClick={closeSidebar}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 font-black">
              V+
            </div>

            <div>
              <p className="font-black tracking-wide">VIVE+COLOMBIA</p>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
                Administración
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={closeSidebar}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            Menú principal
          </p>

          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              if (!item.available) {
                return (
                  <div
                    key={item.label}
                    title="Módulo próximamente disponible"
                    className="flex cursor-not-allowed items-center justify-between rounded-2xl px-3 py-3 text-slate-500"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-5 w-5" />
                      <span className="text-sm font-bold">{item.label}</span>
                    </div>

                    <span className="rounded-full bg-white/5 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-slate-600">
                      Próximo
                    </span>
                  </div>
                );
              }

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.end}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold transition ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-950/30"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/10 p-4">
          {user && (
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="truncate text-sm font-black text-white">
                {user.displayName ?? "Administrador"}
              </p>

              <p className="mt-1 truncate text-xs text-slate-400">
                {user.email}
              </p>

              <div className="mt-3 inline-flex rounded-full bg-blue-500/15 px-3 py-1 text-xs font-bold text-blue-300">
                {getUserRoleLabel(user.role)}
              </div>
            </div>
          )}

          <NavLink
            to="/"
            className="mt-3 flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-bold text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
            Volver a la plataforma
          </NavLink>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Abrir menú administrativo"
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-xl border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-600">
                VIVE ADMIN
              </p>

              <p className="text-sm font-bold text-slate-500">
                Centro de control de la plataforma
              </p>
            </div>
          </div>

          <NavLink
            to="/mi-cuenta"
            className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 transition hover:border-blue-200 hover:bg-blue-50"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white">
              {(user?.displayName ?? user?.email ?? "A")
                .charAt(0)
                .toUpperCase()}
            </div>

            <div className="hidden text-left sm:block">
              <p className="max-w-40 truncate text-sm font-black text-slate-900">
                {user?.displayName ?? "Administrador"}
              </p>

              <p className="text-xs font-semibold text-slate-500">
                Mi cuenta
              </p>
            </div>
          </NavLink>
        </header>

        <main className="min-h-[calc(100vh-5rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}