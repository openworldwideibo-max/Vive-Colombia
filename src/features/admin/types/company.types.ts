export type CompanyType =
  | "operator"
  | "hotel"
  | "restaurant"
  | "guide"
  | "transport"
  | "artisan"
  | "event_creator"
  | "business";

export type CompanyStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "suspended";

export interface Company {
  id: string;
  ownerId: string;

  name: string;
  slug: string;
  type: CompanyType;
  description: string;

  email: string | null;
  phone: string | null;
  website: string | null;

  city: string | null;
  department: string | null;
  country: string;
  address: string | null;

  logoURL: string | null;
  coverURL: string | null;

  status: CompanyStatus;
  isVerified: boolean;
  isActive: boolean;

  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface CreateCompanyInput {
  ownerId: string;

  name: string;
  type: CompanyType;
  description: string;

  email?: string | null;
  phone?: string | null;
  website?: string | null;

  city?: string | null;
  department?: string | null;
  country?: string;
  address?: string | null;

  logoURL?: string | null;
  coverURL?: string | null;
}

export interface UpdateCompanyStatusInput {
  companyId: string;
  status: CompanyStatus;
  isActive?: boolean;
}