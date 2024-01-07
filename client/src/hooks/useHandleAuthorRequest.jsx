import { useContext } from "react"
import { UserContext } from "../context/AuthProvider"
import useAxiosSecure from "./useAxiosSecure";
import Swal from "sweetalert2";

const useHandleAuthorRequest = () => {

    const { user } = useContext(UserContext);
    const axiosSecure = useAxiosSecure();

    const authorRequestHandle = () => {
        axiosSecure.get(`/authRequest?email=${user?.email}`)
            .then(res => {
                if (res?.data) {
                    return Swal.fire({
                        icon: "error",

                        title: "Your request already is in process! Please wait for admin response."
                    })
                }
                else {
                    axiosSecure.post("/authRequest", { email: user?.email, photo: user?.photoURL })
                        .then(res => {
                            if (res?.data?.insertedId) {
                                Swal.fire({
                                    icon: "success",

                                    title: "Your request has been sent to the admin! Please wait for admin response."
                                })
                            }
                        })
                }
            })
    }



    return authorRequestHandle;


}

export default useHandleAuthorRequest