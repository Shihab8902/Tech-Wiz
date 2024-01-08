import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useState } from "react";
import { createContext } from "react"
import auth from "../firebase/firebase.config";
import { useEffect } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const UserContext = createContext(null);



const AuthProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);




    //Create a new user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }


    //Sign in user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //Sign in with Google
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }





    //Log out user
    const userLogOut = () => {
        setLoading(true);
        return signOut(auth);
    }



    //Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const user = { email: currentUser.email };
                axiosPublic.post("/jwt", user)
                    .then(res => {
                        localStorage.setItem("access-token", res.data?.token);
                        setLoading(false);
                    })
            } else {
                localStorage.removeItem("access-token");
                setLoading(false);
            }
            setUser(currentUser);

        });


        return () => {
            unsubscribe();
        }
    }, []);






    const userInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        userLogOut
    }

    return <UserContext.Provider value={userInfo}>
        {children}
    </UserContext.Provider>
}




export default AuthProvider