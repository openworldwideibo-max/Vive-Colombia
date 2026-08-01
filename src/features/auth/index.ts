export {
  AuthProvider,
  useAuth,
} from "./context/AuthContext";

export {
  getCurrentUserProviders,
  linkGoogleToCurrentUser,
  linkPasswordToCurrentUser,
  loginWithEmail,
  loginWithGoogle,
  logoutUser,
  registerWithEmail,
  resetPassword,
} from "./services/auth.service";

export { default as ProtectedRoute } from "./components/ProtectedRoute";
export { default as RoleRoute } from "./components/RoleRoute";

export { default as AccountPage } from "./pages/AccountPage";
export { default as AdminDashboardPage } from "./pages/AdminDashboardPage";
export { default as ForgotPasswordPage } from "./pages/ForgotPasswordPage";
export { default as LoginPage } from "./pages/LoginPage";
export { default as RegisterPage } from "./pages/RegisterPage";

export {
  ADMIN_ROLES,
  BUSINESS_ROLES,
  USER_ROLE_OPTIONS,
  getUserRoleLabel,
  isAdminRole,
  isBusinessRole,
} from "./types/auth.types";

export type {
  AppUser,
  UserRole,
  UserRoleOption,
} from "./types/auth.types";