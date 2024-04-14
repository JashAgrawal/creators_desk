import { auth, authenticateUser } from "@/services/firebase"
import { sendPasswordResetEmail } from "firebase/auth"
import React, { useContext, useState, useEffect } from "react"

const AuthContext = React.createContext({currentUser:"",
    login:async()=>{},
    signup:()=>{},
    logout:()=>{},
    resetPassword:()=>{},
    updatePassword:()=>{}})

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }:{children: any}) {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  function signup(email:string, password:string) {
    return authenticateUser(email, password,false)
  }

  function login(email:string, password:string) {
    return authenticateUser(email, password,true)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email:string) {
    return sendPasswordResetEmail(auth, email)
  }

  function updatePassword(password:string) {
    if(currentUser === null) return;
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}