import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { authApiBaseUrl, tokenKey } from "../constants";
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";

const AuthContext = createContext();


export default AuthContext;


export const AuthProvider = ({ children }) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem(tokenKey) ? JSON.parse(localStorage.getItem(tokenKey)) : null)
    let [user, setUser] = useState(() => localStorage.getItem(tokenKey) ? jwt_decode(localStorage.getItem(tokenKey)) : null)
    let [loadingLogging, setLoadingLogging] = useState(false)

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        setLoadingLogging(true);
        const userData = {
            username: e.target.username.value,
            password: e.target.password.value
        }
        return axios.post(`${authApiBaseUrl}/signin`, userData)
            .then((tokenResponse) => {
                if (tokenResponse?.data) {
                    const data = tokenResponse?.data;

                    console.log('token ', data)

                    setAuthTokens(data)
                    setUser(jwt_decode(data.accessToken))
                    localStorage.setItem(tokenKey, JSON.stringify(data))
                    navigate('/catalog');
                    return Promise.resolve();
                }
            }).catch((err) => {
                return Promise.reject(['invalid username or password']);
            }).finally(() => {
                setLoadingLogging(false);
            })
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem(tokenKey)
        navigate('/signin')
    }

    let contextData = {
        loginUser,
        logoutUser,
        loadingLogging,
        user,
        setUser,
        authTokens,
        setAuthTokens
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.accessToken))
        }
    }, [authTokens])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}