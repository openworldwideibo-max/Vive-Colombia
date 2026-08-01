import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase";
import type {
  Company,
  CompanyStatus,
  CreateCompanyInput,
  UpdateCompanyStatusInput,
} from "../types/company.types";

const COMPANIES_COLLECTION = "companies";

function createSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapCompanyDocument(
  id: string,
  data: Omit<Company, "id">,
): Company {
  return {
    id,
    ...data,
  };
}

/**
 * Crea una empresa nueva en estado pendiente.
 * Este flujo está pensado para solicitudes realizadas
 * por el propietario o responsable de la empresa.
 */
export async function createCompany(
  input: CreateCompanyInput,
): Promise<Company> {
  const normalizedName = input.name.trim();
  const normalizedOwnerId = input.ownerId.trim();

  if (!normalizedName) {
    throw new Error(
      "El nombre de la empresa es obligatorio.",
    );
  }

  if (!normalizedOwnerId) {
    throw new Error(
      "El usuario responsable es obligatorio.",
    );
  }

  const companyData: Omit<Company, "id"> = {
    ownerId: normalizedOwnerId,

    name: normalizedName,
    slug: createSlug(normalizedName),
    type: input.type,
    description: input.description.trim(),

    email: input.email?.trim().toLowerCase() ?? null,
    phone: input.phone?.trim() ?? null,
    website: input.website?.trim() ?? null,

    city: input.city?.trim() ?? null,
    department: input.department?.trim() ?? null,
    country: input.country?.trim() || "Colombia",
    address: input.address?.trim() ?? null,

    logoURL: input.logoURL?.trim() ?? null,
    coverURL: input.coverURL?.trim() ?? null,

    status: "pending",
    isVerified: false,
    isActive: true,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const companiesReference = collection(
    db,
    COMPANIES_COLLECTION,
  );

  const companyReference = await addDoc(
    companiesReference,
    companyData,
  );

  return mapCompanyDocument(
    companyReference.id,
    companyData,
  );
}

/**
 * Permite que un administrador registre una empresa
 * vinculada a otro usuario responsable.
 *
 * Las empresas creadas desde administración quedan
 * aprobadas, verificadas y activas desde el inicio.
 */
export async function createCompanyAsAdmin(
  input: CreateCompanyInput,
): Promise<Company> {
  const normalizedName = input.name.trim();
  const normalizedOwnerId = input.ownerId.trim();

  if (!normalizedName) {
    throw new Error(
      "El nombre de la empresa es obligatorio.",
    );
  }

  if (!normalizedOwnerId) {
    throw new Error(
      "Debes seleccionar un usuario responsable.",
    );
  }

  const companyData: Omit<Company, "id"> = {
    ownerId: normalizedOwnerId,

    name: normalizedName,
    slug: createSlug(normalizedName),
    type: input.type,
    description: input.description.trim(),

    email: input.email?.trim().toLowerCase() ?? null,
    phone: input.phone?.trim() ?? null,
    website: input.website?.trim() ?? null,

    city: input.city?.trim() ?? null,
    department: input.department?.trim() ?? null,
    country: input.country?.trim() || "Colombia",
    address: input.address?.trim() ?? null,

    logoURL: input.logoURL?.trim() ?? null,
    coverURL: input.coverURL?.trim() ?? null,

    status: "approved",
    isVerified: true,
    isActive: true,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const companyReference = await addDoc(
    collection(db, COMPANIES_COLLECTION),
    companyData,
  );

  return mapCompanyDocument(
    companyReference.id,
    companyData,
  );
}

/**
 * Obtiene todas las empresas registradas.
 */
export async function getAllCompanies(): Promise<Company[]> {
  const companiesReference = collection(
    db,
    COMPANIES_COLLECTION,
  );

  const companiesSnapshot = await getDocs(
    companiesReference,
  );

  const companies = companiesSnapshot.docs.map(
    (companyDocument) =>
      mapCompanyDocument(
        companyDocument.id,
        companyDocument.data() as Omit<Company, "id">,
      ),
  );

  return companies.sort((firstCompany, secondCompany) =>
    firstCompany.name.localeCompare(
      secondCompany.name,
      "es",
    ),
  );
}

/**
 * Obtiene una empresa por su ID.
 */
export async function getCompanyById(
  companyId: string,
): Promise<Company | null> {
  const companyReference = doc(
    db,
    COMPANIES_COLLECTION,
    companyId,
  );

  const companySnapshot = await getDoc(
    companyReference,
  );

  if (!companySnapshot.exists()) {
    return null;
  }

  return mapCompanyDocument(
    companySnapshot.id,
    companySnapshot.data() as Omit<Company, "id">,
  );
}

/**
 * Cambia el estado administrativo de una empresa.
 */
export async function updateCompanyStatus({
  companyId,
  status,
  isActive,
}: UpdateCompanyStatusInput): Promise<void> {
  const companyReference = doc(
    db,
    COMPANIES_COLLECTION,
    companyId,
  );

  const updateData: {
    status: CompanyStatus;
    updatedAt: ReturnType<typeof serverTimestamp>;
    isActive?: boolean;
    isVerified?: boolean;
  } = {
    status,
    updatedAt: serverTimestamp(),
  };

  if (typeof isActive === "boolean") {
    updateData.isActive = isActive;
  }

  if (status === "approved") {
    updateData.isVerified = true;
  }

  if (
    status === "rejected" ||
    status === "suspended"
  ) {
    updateData.isVerified = false;
  }

  await updateDoc(
    companyReference,
    updateData,
  );
}