import { useState, createContext, useContext, useEffect, useLayoutEffect } from "react";
import { ingresar, registrarse, verifyToken, leerUsuarios, suspenderUsuario, eliminarUsuario, activarUsuario, actualizarUsuario } from "../utils/auth";
import Cookies from "js-cookie";
import DefaultImage from "../assets/avatarDefault.png";
import Swal from 'sweetalert2'
import { useLocation } from "react-router-dom";

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
    const [isHome, setIsHome] = useState(null)
    const [users, setUsers] = useState([]);
    const [reloadedUsers,setReloadedUsers] = useState(false);

    const signUp = async (user) => {
        try {
            const res = await registrarse(user)
            setUser(res.data)
            setIsAuthenticated(true)

        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
            console.log(error.response.data);
            
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

    const suspendUser = async (id) => {
        try {
            const res = await suspenderUsuario(id)
            setReloadedUsers(true)
            
            
        } catch (error) {
            console.log(error);
        }
    }

    const enableUser = async (id) => {
        try {
            const res = await activarUsuario(id)
            setReloadedUsers(true)
            

        } catch (error) {
            console.log(error);
        }
    }

    const deleteUser = async (id) => {
        try {
            const res = await eliminarUsuario(id)
            if (res.status == 204) setUsers(users.filter(user => user.uid != id))
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async (id,data) => {
        try {
            const res = await actualizarUsuario(id,data)
            if (res.status == 203) setUser(res.data)
            setReloadedUsers(true)
            
        } catch (error) {
            console.log(error);
            console.log(error.response.data);        
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    const logout = () => {
        Swal.fire({
            title: "¿Seguro que quieres cerrar sesion?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonColor: "#a40000",
            confirmButtonText: "Cerrar sesion",
            confirmButtonColor: "#197600",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            background: '#393939',
            color: '#fafafa'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Su sesion ha sido cerrada",
                    icon: "success",
                    background: '#393939',
                    color: '#fafafa'

                });
                Cookies.remove("token");
                setIsAuthenticated(false)
                setUser(null)
            }
        });

    }

    const readUsers = async () => {
        try {
            const res = await leerUsuarios();

            setUsers(res.data);

        } catch (error) {
            console.log(error);
        }
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
        if (reloadedUsers) setReloadedUsers(false)


    }, [errors,reloadedUsers])


    return (
        <AuthContext.Provider value={{
            signUp, signIn, logout, user, isAuthenticated, errors, loading, avatarURL,
            setAvatarURL, isHome, setIsHome, readUsers, users, suspendUser, deleteUser, enableUser, updateUser,
            setReloadedUsers,reloadedUsers
            
        }}>
            {children}
        </AuthContext.Provider>

    )
}