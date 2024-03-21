import { useContext, createContext } from "react";

export const AuthContext = createContext({
    showPassword: true,
    handleShowPassword: () => { },
    notifyError: () => { },
    notifySuccess: () => { }
})

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = AuthContext.Provider