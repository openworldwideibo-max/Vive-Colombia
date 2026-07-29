import type { User } from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import type { AppUser } from "../types/auth.types";

const USERS_COLLECTION = "users";

export async function createUserProfile(
  firebaseUser: User,
): Promise<AppUser> {
  const userReference = doc(
    db,
    USERS_COLLECTION,
    firebaseUser.uid,
  );

  const userSnapshot = await getDoc(userReference);

  if (userSnapshot.exists()) {
    return userSnapshot.data() as AppUser;
  }

  const provider =
    firebaseUser.providerData[0]?.providerId === "google.com"
      ? "google"
      : "password";

  const userProfile: AppUser = {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    role: "tourist",
    provider,
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(userReference, userProfile);

  return userProfile;
}

export async function getUserProfile(
  uid: string,
): Promise<AppUser | null> {
  const userReference = doc(db, USERS_COLLECTION, uid);
  const userSnapshot = await getDoc(userReference);

  if (!userSnapshot.exists()) {
    return null;
  }

  return userSnapshot.data() as AppUser;
}