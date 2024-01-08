import axios from 'axios'

const axiosPublic = axios.create({
    baseURL: "https://techwiz-one.vercel.app"
});

const useAxiosPublic = () => {

    return axiosPublic;
}

export default useAxiosPublic