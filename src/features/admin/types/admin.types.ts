import type {
  AppUser,
  UserRole,
} from "../../auth/types/auth.types";

export interface AdminUser extends AppUser {}

export interface UpdateUserRoleInput {
  targetUserId: string;
  newRole: UserRole;
  currentAdminId: string;
}

export interface UpdateUserStatusInput {
  targetUserId: string;
  isActive: boolean;
  currentAdminId: string;
}

export interface AdminOperationResult {
  success: boolean;
  message: string;
}