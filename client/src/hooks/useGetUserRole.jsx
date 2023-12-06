import { useContext } from "react";
import useAxiosSecure from "./useAxiosSecure"
import { UserContext } from "../context/AuthProvider";

import { useQuery } from "@tanstack/react-query";

const useGetUserRole = () => {
    const { user, loading } = useContext(UserContext);
    const axiosSecure = useAxiosSecure();

    const { data: userRole, refetch } = useQuery({
        queryKey: [user?.email, "userRole"],
        enabled: !loading,
        queryFn: async () => {
            if (user) {
                const result = await axiosSecure.get(`/userRole?email=${user?.email}`)
                return result.data;
            } else {
                return '';
            }
        }
    })


    return { userRole, refetch }



}

export default useGetUserRole