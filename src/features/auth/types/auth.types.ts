export type UserRole =
  | "super_admin"
  | "admin"
  | "operator"
  | "hotel"
  | "restaurant"
  | "guide"
  | "transport"
  | "artisan"
  | "event_creator"
  | "business"
  | "tourist";

export type AuthProvider = "password" | "google";

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber?: string | null;

  role: UserRole;
  provider: AuthProvider;

  isActive: boolean;
  isVerified?: boolean;

  city?: string | null;
  department?: string | null;
  country?: string | null;

  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface UserRoleOption {
  value: UserRole;
  label: string;
  description: string;
}

export const USER_ROLE_OPTIONS: UserRoleOption[] = [
  {
    value: "tourist",
    label: "Turista",
    description:
      "Explora destinos, guarda favoritos y administra tus reservas.",
  },
  {
    value: "operator",
    label: "Operador turístico",
    description:
      "Publica experiencias, recorridos, planes y servicios turísticos.",
  },
  {
    value: "hotel",
    label: "Hotel o alojamiento",
    description:
      "Administra alojamientos, habitaciones, disponibilidad y reservas.",
  },
  {
    value: "restaurant",
    label: "Restaurante",
    description:
      "Publica tu restaurante, menú, horarios y experiencias gastronómicas.",
  },
  {
    value: "guide",
    label: "Guía turístico",
    description:
      "Ofrece recorridos, acompañamiento y experiencias guiadas.",
  },
  {
    value: "transport",
    label: "Transporte turístico",
    description:
      "Publica servicios de transporte, traslados y recorridos.",
  },
  {
    value: "artisan",
    label: "Artesano o vendedor",
    description:
      "Publica productos y servicios dentro del marketplace.",
  },
  {
    value: "event_creator",
    label: "Creador de eventos",
    description:
      "Crea y administra eventos culturales, turísticos y comerciales.",
  },
  {
    value: "business",
    label: "Empresa turística",
    description:
      "Administra servicios y publicaciones comerciales de turismo.",
  },
];

export const ADMIN_ROLES: UserRole[] = [
  "super_admin",
  "admin",
];

export const BUSINESS_ROLES: UserRole[] = [
  "operator",
  "hotel",
  "restaurant",
  "guide",
  "transport",
  "artisan",
  "event_creator",
  "business",
];

export function isAdminRole(role: UserRole) {
  return ADMIN_ROLES.includes(role);
}

export function isBusinessRole(role: UserRole) {
  return BUSINESS_ROLES.includes(role);
}

export function getUserRoleLabel(role: UserRole) {
  const labels: Record<UserRole, string> = {
    super_admin: "Superadministrador",
    admin: "Administrador",
    operator: "Operador turístico",
    hotel: "Hotel o alojamiento",
    restaurant: "Restaurante",
    guide: "Guía turístico",
    transport: "Transporte turístico",
    artisan: "Artesano o vendedor",
    event_creator: "Creador de eventos",
    business: "Empresa turística",
    tourist: "Turista",
  };

  return labels[role];
}