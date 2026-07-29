import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type UserCredential,
} from "firebase/auth";

import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "../../../firebase";

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

async function createUserProfile(user: UserCredential["user"]) {
  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: "tourist",
      provider: user.providerData[0]?.providerId ?? "password",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    },
    {
      merge: true,
    }
  );
}

export async function registerWithEmail(
  displayName: string,
  email: string,
  password: string
) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );

  await updateProfile(credential.user, {
    displayName: displayName.trim(),
  });

  await createUserProfile({
    ...credential.user,
    displayName: displayName.trim(),
  });

  return credential;
}

export async function loginWithEmail(
  email: string,
  password: string
) {
  return signInWithEmailAndPassword(
    auth,
    email.trim(),
    password
  );
}

export async function loginWithGoogle() {
  const credential = await signInWithPopup(
    auth,
    googleProvider
  );

  await createUserProfile(credential.user);

  return credential;
}

export async function logoutUser() {
  await signOut(auth);
}

/**
 * Envía un correo para recuperar la contraseña.
 */
export async function resetPassword(email: string) {
  await sendPasswordResetEmail(
    auth,
    email.trim()
  );
}