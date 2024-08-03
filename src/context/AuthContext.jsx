import { useState, createContext, useContext, useEffect } from "react";
import { ingresar, registrarse, verifyToken } from "../utils/auth";
import Cookies from "js-cookie";
import DefaultImage from "../assets/avatarDefault.png";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [avatarURL, setAvatarURL] = useState(DefaultImage);

    const signUp = async (user) => {
        try {
            console.log(user);

            const res = await registrarse(user)
            setUser(res.data)
            setIsAuthenticated(true)
              
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const signIn = async (user) => {
        try {
            const res = await ingresar(user)
            
            setUser(res.data)
            setIsAuthenticated(true)
            

        } catch (error) {
            
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const logout = () =>{
        Cookies.remove("token");
        setIsAuthenticated(false)
        setUser(null)
        setIsAdmin(false)
    }

    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get()

            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                setUser(null);
                
                return;
            }

            try {
                const res = await verifyToken(cookies.token)
                
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return;
                }
                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }

        checkLogin();
    }, []);

    useEffect(() => {
        if (errors.length > 0) setErrors([])

    }, [errors])



    return (
        <AuthContext.Provider value={{ signUp, signIn,logout, user, isAuthenticated, errors, loading, avatarURL,setAvatarURL }}>
            {children}
        </AuthContext.Provider>

    )
}