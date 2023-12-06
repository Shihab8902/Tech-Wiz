import { useContext } from "react"
import { UserContext } from "../../context/AuthProvider"
import NoDataLoader from "../Loader/NoDataLoader";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    if (loading) {
        return <NoDataLoader />
    }

    if (user) {
        return children;
    }


    return <Navigate to="/signin"></Navigate>



}

export default PrivateRoute