import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'
import { useContext } from 'react'
import { authApiBaseUrl, tokenKey } from '../constants';
import AuthContext from '../context/AuthContext';

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens } = useContext(AuthContext)

    const axiosInstance = axios.create({
        headers: { Authorization: `Bearer ${authTokens?.accessToken}` }
    });


    axiosInstance.interceptors.request.use(async req => {

        const user = jwt_decode(authTokens.accessToken)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        if (!isExpired)
            return req

        const response = await axios.post(`${authApiBaseUrl}/refresh-token`, {
            accessToken: authTokens.accessToken,
            refreshToken: authTokens.refreshToken
        });

        localStorage.setItem(tokenKey, JSON.stringify(response.data))

        setAuthTokens(response.data)
        setUser(jwt_decode(response.data.accessToken))

        req.headers.Authorization = `Bearer ${response.data.accessToken}`
        return req
    })

    return axiosInstance
}

export default useAxios;