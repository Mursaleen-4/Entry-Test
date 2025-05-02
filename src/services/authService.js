import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

// Firebase authentication and firestore initialization
const auth = getAuth();

export const signUp = async (email, password) => {
  console.log(email,password,"starting");
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user.email, user.uid, "user");
  
  } catch (error) {
    console.error("Signup Error:", error);
    throw new Error(error.message);
  }
  
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
