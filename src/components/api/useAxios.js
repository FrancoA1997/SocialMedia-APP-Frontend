import axios from 'axios'
import jwt_decode from 'jwt-decode';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const baseURL = process.env.BASEURL;

const useAxios = () => {
    const {user, dispatch} = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers: {authorization: `Bearer ${user.accessToken}`}
      })
      axiosInstance.interceptors.request.use( async (config) =>{
        let currentDate = new Date();
        const decodedToken = jwt_decode(user.accessToken);
        if(decodedToken.exp * 1000 < currentDate.getTime()){
          const res = await axios.post("/auth/refresh", {token : user.refreshToken})
         if(res)
         dispatch({
            type: "REFRESH_TOKEN",
            payload: {
              token: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            }
          });
          config.headers["authorization"] = "Bearer " + res.data.accessToken;
        }
        return config;
      },(error) => {
        return Promise.reject(error);
      }
    )
      return axiosInstance
}

export default useAxios
