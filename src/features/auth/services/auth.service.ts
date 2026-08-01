import {
  EmailAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  linkWithCredential,
  linkWithPopup,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
  type UserCredential,
} from "firebase/auth";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../../../firebase";

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

function getProviderNames(user: User): string[] {
  const providers = user.providerData.map(
    (provider) => provider.providerId
  );

  return [...new Set(providers)];
}

function getMainProvider(
  user: User
): "password" | "google" {
  const providers = getProviderNames(user);

  if (providers.includes("google.com")) {
    return "google";
  }

  return "password";
}

/**
 * Crea el perfil en Firestore únicamente cuando no existe.
 *
 * Si el perfil ya existe, actualiza solamente información básica.
 * Nunca sobrescribe el rol, el estado ni la fecha de creación.
 */
async function createOrUpdateUserProfile(
  user: User,
  displayNameOverride?: string
) {
  const userReference = doc(db, "users", user.uid);
  const userSnapshot = await getDoc(userReference);

  const displayName =
    displayNameOverride?.trim() ||
    user.displayName ||
    null;

  const providers = getProviderNames(user);

  if (!userSnapshot.exists()) {
    await setDoc(userReference, {
      uid: user.uid,
      email: user.email,
      displayName,
      photoURL: user.photoURL,
      role: "tourist",
      provider: getMainProvider(user),
      providers,
      isActive: true,
      isVerified: user.emailVerified,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return;
  }

  await setDoc(
    userReference,
    {
      uid: user.uid,
      email: user.email,
      displayName,
      photoURL: user.photoURL,
      provider: getMainProvider(user),
      providers,
      isVerified: user.emailVerified,
      updatedAt: serverTimestamp(),
    },
    {
      merge: true,
    }
  );
}

/**
 * Registra un usuario nuevo mediante correo y contraseña.
 */
export async function registerWithEmail(
  displayName: string,
  email: string,
  password: string
): Promise<UserCredential> {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedName = displayName.trim();

  const credential =
    await createUserWithEmailAndPassword(
      auth,
      normalizedEmail,
      password
    );

  await updateProfile(credential.user, {
    displayName: normalizedName,
  });

  await createOrUpdateUserProfile(
    credential.user,
    normalizedName
  );

  return credential;
}

/**
 * Inicia sesión mediante correo y contraseña.
 */
export async function loginWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  const credential =
    await signInWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      password
    );

  await createOrUpdateUserProfile(credential.user);

  return credential;
}

/**
 * Inicia sesión mediante Google.
 */
export async function loginWithGoogle(): Promise<UserCredential> {
  const credential = await signInWithPopup(
    auth,
    googleProvider
  );

  await createOrUpdateUserProfile(credential.user);

  return credential;
}

/**
 * Vincula Google al usuario que ya inició sesión.
 *
 * Ejemplo:
 * el usuario entró con correo y contraseña y desea poder
 * entrar también con Google.
 */
export async function linkGoogleToCurrentUser(): Promise<UserCredential> {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error(
      "Debes iniciar sesión antes de vincular Google."
    );
  }

  const providers = getProviderNames(currentUser);

  if (providers.includes("google.com")) {
    throw new Error(
      "Tu cuenta ya está vinculada con Google."
    );
  }

  const credential = await linkWithPopup(
    currentUser,
    googleProvider
  );

  await createOrUpdateUserProfile(credential.user);

  return credential;
}

/**
 * Vincula una contraseña al usuario que ya inició sesión.
 *
 * Ejemplo:
 * el usuario entró con Google y desea poder entrar también
 * escribiendo su correo y una contraseña.
 */
export async function linkPasswordToCurrentUser(
  password: string
): Promise<UserCredential> {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    throw new Error(
      "Debes iniciar sesión antes de crear una contraseña."
    );
  }

  if (!currentUser.email) {
    throw new Error(
      "Tu cuenta no tiene un correo disponible."
    );
  }

  const providers = getProviderNames(currentUser);

  if (providers.includes("password")) {
    throw new Error(
      "Tu cuenta ya tiene acceso mediante contraseña."
    );
  }

  const emailCredential = EmailAuthProvider.credential(
    currentUser.email,
    password
  );

  const credential = await linkWithCredential(
    currentUser,
    emailCredential
  );

  await createOrUpdateUserProfile(credential.user);

  return credential;
}

/**
 * Devuelve los proveedores vinculados al usuario actual.
 *
 * Posibles valores:
 * - password
 * - google.com
 */
export function getCurrentUserProviders(): string[] {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    return [];
  }

  return getProviderNames(currentUser);
}

/**
 * Cierra la sesión actual.
 */
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Envía el correo para recuperar la contraseña.
 */
export async function resetPassword(
  email: string
): Promise<void> {
  await sendPasswordResetEmail(
    auth,
    email.trim().toLowerCase()
  );
}