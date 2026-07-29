import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../../firebase";
import { createUserProfile } from "./user.service";

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export async function registerWithEmail(
  name: string,
  email: string,
  password: string,
) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await updateProfile(credential.user, {
    displayName: name,
  });

  await createUserProfile(credential.user);

  return credential.user;
}

export async function loginWithEmail(
  email: string,
  password: string,
) {
  const credential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await createUserProfile(credential.user);

  return credential.user;
}

export async function loginWithGoogle() {
  const credential = await signInWithPopup(auth, googleProvider);

  await createUserProfile(credential.user);

  return credential.user;
}

export async function logoutUser() {
  await signOut(auth);
}