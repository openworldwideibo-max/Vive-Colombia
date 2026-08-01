import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase";
import type {
  AppUser,
  UserRole,
} from "../../auth/types/auth.types";
import type {
  AdminOperationResult,
  UpdateUserRoleInput,
  UpdateUserStatusInput,
} from "../types/admin.types";

const USERS_COLLECTION = "users";

const ASSIGNABLE_ROLES: UserRole[] = [
  "admin",
  "operator",
  "hotel",
  "restaurant",
  "guide",
  "transport",
  "artisan",
  "event_creator",
  "business",
  "tourist",
];

async function getUserById(
  uid: string,
): Promise<AppUser | null> {
  const userReference = doc(
    db,
    USERS_COLLECTION,
    uid,
  );

  const userSnapshot = await getDoc(userReference);

  if (!userSnapshot.exists()) {
    return null;
  }

  return userSnapshot.data() as AppUser;
}

/**
 * Obtiene todos los perfiles almacenados en Firestore.
 */
export async function getAllUsers(): Promise<AppUser[]> {
  const usersReference = collection(
    db,
    USERS_COLLECTION,
  );

  const usersSnapshot = await getDocs(usersReference);

  const users = usersSnapshot.docs.map(
    (userDocument) => userDocument.data() as AppUser,
  );

  return users.sort((firstUser, secondUser) => {
    const firstName =
      firstUser.displayName ??
      firstUser.email ??
      "";

    const secondName =
      secondUser.displayName ??
      secondUser.email ??
      "";

    return firstName.localeCompare(
      secondName,
      "es",
    );
  });
}

/**
 * Cambia el rol de un usuario.
 *
 * El rol super_admin no puede asignarse desde el panel.
 * Tampoco se permite modificar a otro superadministrador.
 */
export async function updateUserRole({
  targetUserId,
  newRole,
  currentAdminId,
}: UpdateUserRoleInput): Promise<AdminOperationResult> {
  if (targetUserId === currentAdminId) {
    return {
      success: false,
      message:
        "No puedes cambiar tu propio rol desde el panel administrativo.",
    };
  }

  if (!ASSIGNABLE_ROLES.includes(newRole)) {
    return {
      success: false,
      message:
        "El rol seleccionado no puede asignarse desde este panel.",
    };
  }

  const targetUser = await getUserById(targetUserId);

  if (!targetUser) {
    return {
      success: false,
      message: "El usuario no existe.",
    };
  }

  if (targetUser.role === "super_admin") {
    return {
      success: false,
      message:
        "No está permitido modificar el rol de un superadministrador.",
    };
  }

  const userReference = doc(
    db,
    USERS_COLLECTION,
    targetUserId,
  );

  await updateDoc(userReference, {
    role: newRole,
    updatedAt: serverTimestamp(),
  });

  return {
    success: true,
    message: "El rol fue actualizado correctamente.",
  };
}

/**
 * Activa o desactiva un perfil dentro de la plataforma.
 *
 * Este estado controla el acceso desde la aplicación,
 * pero no elimina la cuenta de Firebase Authentication.
 */
export async function updateUserStatus({
  targetUserId,
  isActive,
  currentAdminId,
}: UpdateUserStatusInput): Promise<AdminOperationResult> {
  if (targetUserId === currentAdminId) {
    return {
      success: false,
      message:
        "No puedes desactivar tu propia cuenta desde el panel.",
    };
  }

  const targetUser = await getUserById(targetUserId);

  if (!targetUser) {
    return {
      success: false,
      message: "El usuario no existe.",
    };
  }

  if (targetUser.role === "super_admin") {
    return {
      success: false,
      message:
        "No está permitido desactivar a un superadministrador.",
    };
  }

  const userReference = doc(
    db,
    USERS_COLLECTION,
    targetUserId,
  );

  await updateDoc(userReference, {
    isActive,
    updatedAt: serverTimestamp(),
  });

  return {
    success: true,
    message: isActive
      ? "La cuenta fue activada correctamente."
      : "La cuenta fue desactivada correctamente.",
  };
}