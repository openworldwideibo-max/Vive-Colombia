import {
  AlertCircle,
  ArrowLeft,
  Building2,
  LoaderCircle,
  Save,
  UserRound,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
  type SyntheticEvent,
} from "react";
import {
  Link,
  useNavigate,
} from "react-router";

import {
  getAllUsers,
} from "../services/users.service";
import {
  createCompanyAsAdmin,
} from "../services/companies.service";
import type {
  CompanyType,
  CreateCompanyInput,
} from "../types/company.types";
import type {
  AppUser,
} from "../../auth/types/auth.types";

const companyTypes: Array<{
  value: CompanyType;
  label: string;
}> = [
  {
    value: "operator",
    label: "Operador turístico",
  },
  {
    value: "hotel",
    label: "Hotel o alojamiento",
  },
  {
    value: "restaurant",
    label: "Restaurante",
  },
  {
    value: "guide",
    label: "Guía turístico",
  },
  {
    value: "transport",
    label: "Transporte turístico",
  },
  {
    value: "artisan",
    label: "Artesano o vendedor",
  },
  {
    value: "event_creator",
    label: "Creador de eventos",
  },
  {
    value: "business",
    label: "Empresa turística",
  },
];

const initialForm: CreateCompanyInput = {
  ownerId: "",
  name: "",
  type: "operator",
  description: "",
  email: "",
  phone: "",
  website: "",
  city: "",
  department: "",
  country: "Colombia",
  address: "",
  logoURL: "",
  coverURL: "",
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return "No fue posible registrar la empresa.";
}

export default function AdminCreateCompanyPage() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<CreateCompanyInput>(initialForm);

  const [users, setUsers] = useState<AppUser[]>([]);
  const [userSearch, setUserSearch] = useState("");

  const [isLoadingUsers, setIsLoadingUsers] =
    useState(true);
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    const loadUsers = async () => {
      setIsLoadingUsers(true);
      setErrorMessage("");

      try {
        const loadedUsers = await getAllUsers();

        setUsers(
          loadedUsers.filter(
            (registeredUser) =>
              registeredUser.isActive,
          ),
        );
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
      } finally {
        setIsLoadingUsers(false);
      }
    };

    void loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = userSearch
      .trim()
      .toLowerCase();

    if (!normalizedSearch) {
      return users;
    }

    return users.filter((registeredUser) => {
      const name =
        registeredUser.displayName?.toLowerCase() ??
        "";

      const email =
        registeredUser.email?.toLowerCase() ??
        "";

      return (
        name.includes(normalizedSearch) ||
        email.includes(normalizedSearch)
      );
    });
  }, [userSearch, users]);

  const selectedOwner = useMemo(
    () =>
      users.find(
        (registeredUser) =>
          registeredUser.uid === formData.ownerId,
      ) ?? null,
    [formData.ownerId, users],
  );

  const updateField = <
    Field extends keyof CreateCompanyInput,
  >(
    field: Field,
    value: CreateCompanyInput[Field],
  ) => {
    setFormData((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: SyntheticEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setErrorMessage("");

    if (!formData.ownerId) {
      setErrorMessage(
        "Debes seleccionar un usuario responsable.",
      );
      return;
    }

    if (!formData.name.trim()) {
      setErrorMessage(
        "El nombre de la empresa es obligatorio.",
      );
      return;
    }

    if (!formData.description.trim()) {
      setErrorMessage(
        "La descripción de la empresa es obligatoria.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await createCompanyAsAdmin(formData);

      navigate("/administracion/empresas", {
        replace: true,
      });
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/administracion/empresas"
          className="inline-flex items-center gap-2 font-bold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft className="h-5 w-5" />
          Volver a empresas
        </Link>

        <div className="mt-6 rounded-3xl bg-slate-950 px-7 py-9 text-white shadow-xl sm:px-10">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600">
              <Building2 className="h-7 w-7" />
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-400">
                Administración
              </p>

              <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                Registrar empresa
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-slate-300">
                Crea una empresa o prestador turístico y
                vincúlalo a un usuario responsable de la
                plataforma.
              </p>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mt-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700"
          >
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

            <p className="font-semibold">
              {errorMessage}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-8"
        >
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3">
              <UserRound className="h-6 w-6 text-blue-600" />

              <div>
                <h2 className="text-xl font-black text-slate-950">
                  Usuario responsable
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Selecciona la cuenta que administrará esta
                  empresa.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="owner-search"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Buscar usuario
              </label>

              <input
                id="owner-search"
                type="search"
                value={userSearch}
                onChange={(event) =>
                  setUserSearch(event.target.value)
                }
                placeholder="Buscar por nombre o correo"
                className="min-h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="mt-4">
              <label
                htmlFor="ownerId"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Responsable
              </label>

              <select
                id="ownerId"
                value={formData.ownerId}
                onChange={(event) =>
                  updateField(
                    "ownerId",
                    event.target.value,
                  )
                }
                disabled={isLoadingUsers}
                required
                className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-60"
              >
                <option value="">
                  {isLoadingUsers
                    ? "Cargando usuarios..."
                    : "Selecciona un usuario"}
                </option>

                {filteredUsers.map(
                  (registeredUser) => (
                    <option
                      key={registeredUser.uid}
                      value={registeredUser.uid}
                    >
                      {registeredUser.displayName ??
                        "Usuario sin nombre"}{" "}
                      —{" "}
                      {registeredUser.email ??
                        "Sin correo"}
                    </option>
                  ),
                )}
              </select>
            </div>

            {selectedOwner && (
              <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <p className="font-black text-slate-950">
                  {selectedOwner.displayName ??
                    "Usuario sin nombre"}
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {selectedOwner.email ??
                    "Sin correo registrado"}
                </p>
              </div>
            )}
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-black text-slate-950">
              Información principal
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="company-name"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Nombre de la empresa
                </label>

                <input
                  id="company-name"
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    updateField(
                      "name",
                      event.target.value,
                    )
                  }
                  required
                  placeholder="Ejemplo: Andes Travel Colombia"
                  className="min-h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="company-type"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Tipo de empresa
                </label>

                <select
                  id="company-type"
                  value={formData.type}
                  onChange={(event) =>
                    updateField(
                      "type",
                      event.target.value as CompanyType,
                    )
                  }
                  className="min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  {companyTypes.map((companyType) => (
                    <option
                      key={companyType.value}
                      value={companyType.value}
                    >
                      {companyType.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="company-description"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Descripción
              </label>

              <textarea
                id="company-description"
                value={formData.description}
                onChange={(event) =>
                  updateField(
                    "description",
                    event.target.value,
                  )
                }
                required
                rows={5}
                placeholder="Describe los servicios, experiencias y características de la empresa."
                className="w-full resize-y rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-black text-slate-950">
              Datos de contacto
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="company-email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Correo electrónico
                </label>

                <input
                  id="company-email"
                  type="email"
                  value={formData.email ?? ""}
                  onChange={(event) =>
                    updateField(
                      "email",
                      event.target.value,
                    )
                  }
                  placeholder="empresa@correo.com"
                  className="min-h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="company-phone"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Teléfono
                </label>

                <input
                  id="company-phone"
                  type="tel"
                  value={formData.phone ?? ""}
                  onChange={(event) =>
                    updateField(
                      "phone",
                      event.target.value,
                    )
                  }
                  placeholder="+57 300 000 0000"
                  className="min-h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="company-website"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Sitio web
                </label>

                <input
                  id="company-website"
                  type="url"
                  value={formData.website ?? ""}
                  onChange={(event) =>
                    updateField(
                      "website",
                      event.target.value,
                    )
                  }
                  placeholder="https://www.empresa.com"
                  className="min-h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-black text-slate-950">
              Ubicación
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="company-country"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  País
                </label>

                <input
                  id="company-country"
                  type="text"
                  value={formData.country ?? ""}
                  onChange={(event) =>
                    updateField(
                      "country",
                      event.target.value,
                    )
                  }
                  className="min-h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="company-department"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Departamento
                </label>

                <input
                  id="company-department"
                  type="text"
                  value={formData.department ?? ""}
                  onChange={(event) =>
                    updateField(
                      "department",
                      event.target.value,
                    )
                  }
                  placeholder="Ejemplo: Cundinamarca"
                  className="min-h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="company-city"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Ciudad o municipio
                </label>

                <input
                  id="company-city"
                  type="text"
                  value={formData.city ?? ""}
                  onChange={(event) =>
                    updateField(
                      "city",
                      event.target.value,
                    )
                  }
                  placeholder="Ejemplo: Bogotá"
                  className="min-h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="company-address"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Dirección
                </label>

                <input
                  id="company-address"
                  type="text"
                  value={formData.address ?? ""}
                  onChange={(event) =>
                    updateField(
                      "address",
                      event.target.value,
                    )
                  }
                  placeholder="Dirección comercial"
                  className="min-h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-black text-slate-950">
              Imágenes por URL
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Más adelante añadiremos carga directa de archivos
              con Firebase Storage.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="company-logo"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  URL del logotipo
                </label>

                <input
                  id="company-logo"
                  type="url"
                  value={formData.logoURL ?? ""}
                  onChange={(event) =>
                    updateField(
                      "logoURL",
                      event.target.value,
                    )
                  }
                  placeholder="https://..."
                  className="min-h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="company-cover"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  URL de portada
                </label>

                <input
                  id="company-cover"
                  type="url"
                  value={formData.coverURL ?? ""}
                  onChange={(event) =>
                    updateField(
                      "coverURL",
                      event.target.value,
                    )
                  }
                  placeholder="https://..."
                  className="min-h-12 w-full rounded-2xl border border-slate-300 px-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/administracion/empresas"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={
                isSubmitting ||
                isLoadingUsers
              }
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <LoaderCircle className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}

              Registrar empresa
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}