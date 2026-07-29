export type UserRole =
  | "super_admin"
  | "admin"
  | "operator"
  | "hotel"
  | "restaurant"
  | "guide"
  | "business"
  | "tourist";

export interface AppUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: UserRole;
  provider: "password" | "google";
  isActive: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}