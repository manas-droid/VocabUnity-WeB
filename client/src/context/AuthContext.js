import React, { useContext , useState , useEffect} from 'react';
import {auth} from '../firebase';

const BACKEND = "http://localhost:5000/api/users/add";

const AuthContext = React.createContext();


export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){

    const [currentUser , setCurrentUser] = useState();
    const [loading , setLoading] = useState(false);

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
        const unsubscribe = auth.onAuthStateChanged(user=>{ 
            setCurrentUser(user);
            setLoading(false);    
        });
        return unsubscribe
    } , []);
    

   
    const value = {
        currentUser,
        login,
        signUp,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value} >
            {!loading && children}
        </AuthContext.Provider>
    );

}