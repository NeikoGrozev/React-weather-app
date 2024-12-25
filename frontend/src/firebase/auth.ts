import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { serializeUser } from "./firebaseHelper";
import { UserProps } from "../interfaces/UserProps";

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const serializedUser = serializeUser(userCredential.user as UserProps);

    return serializedUser;
  } catch (error) {
    console.log("Login failed! - ", error);
  }
};

export const register = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName,
    });

    return await login(email, password);
  } catch (error) {
    console.log("Register failed! - ", error);
  }
};

export const logout = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.log("Logout failed! - ", error);
  }
};
