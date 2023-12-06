
import useAxiosPublic from './useAxiosPublic';



const useSaveUserToDB = () => {
    const axiosPublic = useAxiosPublic();


    const handleSaveUserToDB = (user) => {
        axiosPublic.get(`/user?email=${user?.email}`)
            .then(res => {
                if (!res.data) {
                    axiosPublic.post("/user", user)

                }
            });

    }


    return { handleSaveUserToDB };
}

export default useSaveUserToDB