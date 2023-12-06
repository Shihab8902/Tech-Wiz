import axios from "axios"
import { useContext } from "react";
import { UserContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: "http://localhost:9000"
})

const useAxiosSecure = () => {

    const { userLogOut } = useContext(UserContext);
    const navigate = useNavigate();


    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem("access-token");
        config.headers = {
            authorization: `bearer ${token}`
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            userLogOut();
            navigate("/")
        }
    })




    return axiosSecure;
}

export default useAxiosSecure