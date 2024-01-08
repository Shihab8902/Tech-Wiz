import NoDataLoader from "../../../../components/Loader/NoDataLoader";
import useGetSecure from "../../../../hooks/useGetSecure"
import AuthorRequestCards from "./AuthorRequestCards";

const AuthorRequests = () => {

    const { data: requests, isPending, refetch } = useGetSecure(["author-requests"], `/authRequests`);

    return <div className="  px-5 py-10 bg-white shadow rounded-lg min-h-screen">
        <h3 className="text-center font-semibold text-xl uppercase">Author Requests</h3>


        {
            isPending ? <NoDataLoader />
                : requests?.length > 0 ? <div className="grid md:grid-cols-2 gap-6 mt-10">
                    {
                        requests?.map(request => <AuthorRequestCards key={request?._id} request={request} refetch={refetch} />)
                    }
                </div>
                    : <div>
                        <h3 className="text-center my-20 text-gray-400 text-3xl font-semibold">No pending request</h3>
                    </div>
        }

    </div>
}

export default AuthorRequests