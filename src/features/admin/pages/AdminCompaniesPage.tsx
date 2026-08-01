import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  XCircle,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";

import {
  getAllCompanies,
  updateCompanyStatus,
} from "../services/companies.service";
import type {
  Company,
  CompanyStatus,
  CompanyType,
} from "../types/company.types";

const companyTypeLabels: Record<CompanyType, string> = {
  operator: "Operador turístico",
  hotel: "Hotel o alojamiento",
  restaurant: "Restaurante",
  guide: "Guía turístico",
  transport: "Transporte turístico",
  artisan: "Artesano o vendedor",
  event_creator: "Creador de eventos",
  business: "Empresa turística",
};

const companyStatusLabels: Record<CompanyStatus, string> = {
  pending: "Pendiente",
  approved: "Aprobada",
  rejected: "Rechazada",
  suspended: "Suspendida",
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ocurrió un error inesperado.";
}

export default function AdminCompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    CompanyStatus | "all"
  >("all");

  const [isLoading, setIsLoading] = useState(true);
  const [updatingCompanyId, setUpdatingCompanyId] =
    useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loadCompanies = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const loadedCompanies = await getAllCompanies();
      setCompanies(loadedCompanies);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadCompanies();
  }, []);

  const filteredCompanies = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase();

    return companies.filter((company) => {
      const matchesSearch =
        !normalizedSearch ||
        company.name.toLowerCase().includes(normalizedSearch) ||
        company.email?.toLowerCase().includes(normalizedSearch) ||
        company.city?.toLowerCase().includes(normalizedSearch) ||
        company.department
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        companyTypeLabels[company.type]
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        company.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [companies, searchTerm, statusFilter]);

  const statistics = useMemo(() => {
    return {
      total: companies.length,
      pending: companies.filter(
        (company) => company.status === "pending",
      ).length,
      approved: companies.filter(
        (company) => company.status === "approved",
      ).length,
      suspended: companies.filter(
        (company) => company.status === "suspended",
      ).length,
    };
  }, [companies]);

  const handleStatusChange = async (
    company: Company,
    status: CompanyStatus,
  ) => {
    setUpdatingCompanyId(company.id);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await updateCompanyStatus({
        companyId: company.id,
        status,
        isActive: status !== "suspended",
      });

      setCompanies((currentCompanies) =>
        currentCompanies.map((currentCompany) =>
          currentCompany.id === company.id
            ? {
                ...currentCompany,
                status,
                isActive: status !== "suspended",
                isVerified: status === "approved",
              }
            : currentCompany,
        ),
      );

      setSuccessMessage(
        `La empresa "${company.name}" fue actualizada correctamente.`,
      );
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setUpdatingCompanyId(null);
    }
  };

  return (
    <section className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-slate-950 px-7 py-9 text-white shadow-xl sm:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
                Administración
              </p>

              <h1 className="mt-3 text-3xl font-black sm:text-4xl">
                Empresas y prestadores
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Consulta, registra, aprueba, rechaza o suspende
                empresas, alojamientos, restaurantes, guías y
                operadores turísticos.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/administracion/empresas/nueva"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 font-bold text-white transition hover:bg-blue-500"
              >
                <Plus className="h-5 w-5" />
                Nueva empresa
              </Link>

              <button
                type="button"
                onClick={() => void loadCompanies()}
                disabled={isLoading}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 font-bold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                ) : (
                  <RefreshCw className="h-5 w-5" />
                )}

                Actualizar
              </button>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="font-semibold">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="font-semibold">{errorMessage}</p>
          </div>
        )}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <Building2 className="h-7 w-7 text-blue-600" />

            <p className="mt-4 text-sm font-black uppercase tracking-wider text-slate-500">
              Total
            </p>

            <p className="mt-1 text-3xl font-black text-slate-950">
              {statistics.total}
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <Clock3 className="h-7 w-7 text-amber-600" />

            <p className="mt-4 text-sm font-black uppercase tracking-wider text-slate-500">
              Pendientes
            </p>

            <p className="mt-1 text-3xl font-black text-slate-950">
              {statistics.pending}
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <CheckCircle2 className="h-7 w-7 text-emerald-600" />

            <p className="mt-4 text-sm font-black uppercase tracking-wider text-slate-500">
              Aprobadas
            </p>

            <p className="mt-1 text-3xl font-black text-slate-950">
              {statistics.approved}
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <ShieldAlert className="h-7 w-7 text-red-600" />

            <p className="mt-4 text-sm font-black uppercase tracking-wider text-slate-500">
              Suspendidas
            </p>

            <p className="mt-1 text-3xl font-black text-slate-950">
              {statistics.suspended}
            </p>
          </article>
        </div>

        <div className="mt-8 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1fr_240px]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Buscar por nombre, ciudad, correo o tipo"
              className="min-h-12 w-full rounded-2xl border border-slate-300 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value as CompanyStatus | "all",
              )
            }
            className="min-h-12 rounded-2xl border border-slate-300 bg-white px-4 font-semibold text-slate-800 outline-none focus:border-blue-500"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendientes</option>
            <option value="approved">Aprobadas</option>
            <option value="rejected">Rechazadas</option>
            <option value="suspended">Suspendidas</option>
          </select>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {isLoading ? (
            <div className="flex min-h-72 items-center justify-center">
              <div className="text-center">
                <LoaderCircle className="mx-auto h-10 w-10 animate-spin text-blue-600" />

                <p className="mt-4 font-semibold text-slate-600">
                  Cargando empresas...
                </p>
              </div>
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div className="flex min-h-72 items-center justify-center px-6 text-center">
              <div>
                <Building2 className="mx-auto h-12 w-12 text-slate-300" />

                <h2 className="mt-4 text-xl font-black text-slate-950">
                  No hay empresas registradas
                </h2>

                <p className="mt-2 text-slate-600">
                  Registra la primera empresa o prestador turístico.
                </p>

                <Link
                  to="/administracion/empresas/nueva"
                  className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 font-bold text-white transition hover:bg-blue-500"
                >
                  <Plus className="h-5 w-5" />
                  Registrar empresa
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                      Empresa
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                      Tipo
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                      Ubicación
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-black uppercase tracking-wider text-slate-500">
                      Estado
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wider text-slate-500">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredCompanies.map((company) => {
                    const isUpdating =
                      updatingCompanyId === company.id;

                    return (
                      <tr key={company.id}>
                        <td className="px-6 py-5">
                          <p className="font-black text-slate-950">
                            {company.name}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            {company.email ?? "Sin correo"}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700">
                            {companyTypeLabels[company.type]}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          {company.city ??
                            company.department ??
                            "Sin ubicación"}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-sm font-bold ${
                              company.status === "approved"
                                ? "bg-emerald-100 text-emerald-700"
                                : company.status === "pending"
                                  ? "bg-amber-100 text-amber-700"
                                  : company.status === "rejected"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {companyStatusLabels[company.status]}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex flex-wrap justify-end gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                void handleStatusChange(
                                  company,
                                  "approved",
                                )
                              }
                              disabled={
                                isUpdating ||
                                company.status === "approved"
                              }
                              className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-emerald-600 px-3 text-sm font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Aprobar
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                void handleStatusChange(
                                  company,
                                  "rejected",
                                )
                              }
                              disabled={
                                isUpdating ||
                                company.status === "rejected"
                              }
                              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-red-200 px-3 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <XCircle className="h-4 w-4" />
                              Rechazar
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                void handleStatusChange(
                                  company,
                                  "suspended",
                                )
                              }
                              disabled={
                                isUpdating ||
                                company.status === "suspended"
                              }
                              className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-300 px-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <ShieldAlert className="h-4 w-4" />
                              Suspender
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}