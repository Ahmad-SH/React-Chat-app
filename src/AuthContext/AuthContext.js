import React, { useContext } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { fireBaseAuth } from "../firebase/firebaseAuth";
//1- createContext
const authContext = React.createContext();
//2- export func through useContxt
export function useAuth() {
  return useContext(authContext);
}
//3- getAuth
const auth = getAuth();
console.log(auth);
const AuthContext = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const value = {
    signup,
    signin,
    googleSignIn,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContext;

//4- return context Provider with value
//5- define functions to be exported as values
//6- import firebaseAuth
