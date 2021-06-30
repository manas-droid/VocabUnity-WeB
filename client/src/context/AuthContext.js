import React, { useContext , useState , useEffect} from 'react';
import {auth} from '../components/firebase';

const BACKEND = "http://localhost:5000/api/users/add";

const AuthContext = React.createContext();


export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [currentUser , setCurrentUser] = useState(null);
    const [loading , setLoading] = useState(true);

    const signUp = async (email , password)=>{
        const result = await auth.createUserWithEmailAndPassword(email , password)
        const {displayName , photoURL , uid } = result.user;

        fetch(BACKEND , {method : "POST" , headers : { 'Content-Type': 'application/json' } , body : JSON.stringify({displayName , photoURL,uid})});
        return result;
    };

  
    const login = async (email , password)=>auth.signInWithEmailAndPassword(email,password);
    
    const logout = ()=>auth.signOut();

    const updateProfile = (photoURL , displayName)=> currentUser.updateProfile({photoURL , displayName}); 

    useEffect(()=>{
        auth.onAuthStateChanged(user=>{ 
            setCurrentUser(user);
            setLoading(false);
        });

    } , []);

    return (
        <AuthContext.Provider value={{
            currentUser,
            login,
            signUp,
            logout,
            updateProfile
        }}>

            {!loading && children}
        </AuthContext.Provider>
    );

}