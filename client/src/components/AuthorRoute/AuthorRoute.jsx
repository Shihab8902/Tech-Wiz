import { Navigate } from "react-router-dom";
import useGetUserRole from "../../hooks/useGetUserRole"
import NoDataLoader from "../Loader/NoDataLoader";

const AuthorRoute = ({ children }) => {

    const { userRole, isLoading } = useGetUserRole();

    if (isLoading) {
        return <NoDataLoader />
    }

    if (userRole === "admin" || userRole === "author") {
        return children;
    }

    return <Navigate to="/signin"></Navigate>


}

export default AuthorRoute