import axios from "axios";
import jwt_decode from 'jwt-decode';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const {user, dispatch} = useContext(AuthContext)
const axiosJWT = axios.create()

const refreshToken = async () => {
  try{
    const res = await axios.post("auth/refresh", {token : user.refreshToken})
    dispatch({
      type: "REFRESH_TOKEN",
      payload: {
        token: res.data.accessToken,
        refreshToken: res.data.refreshToken,
      }
    });
  }catch(err){
    console.log(err)
  }
}
  axiosJWT.interceptors.request.use( async (config) =>{
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if(decodedToken.exp * 1000 < currentDate.getTime()){
        const data = await refreshToken()
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },(error) => {
      return Promise.reject(error);
    }
  )

  export default axiosJWT;
