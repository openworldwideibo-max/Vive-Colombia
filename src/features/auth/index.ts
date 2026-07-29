export {
  AuthProvider,
  useAuth,
} from "./context/AuthContext";

export {
  loginWithEmail,
  loginWithGoogle,
  logoutUser,
  registerWithEmail,
  resetPassword,
} from "./services/auth.service";

export { default as AccountPage } from "./pages/AccountPage";
export { default as ForgotPasswordPage } from "./pages/ForgotPasswordPage";
export { default as LoginPage } from "./pages/LoginPage";
export { default as RegisterPage } from "./pages/RegisterPage";

export type {
  AppUser,
  UserRole,
} from "./types/auth.types";