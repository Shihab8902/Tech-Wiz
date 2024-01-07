import { useEffect, useState } from "react";
import NoDataLoader from "../../../../components/Loader/NoDataLoader";
import useGetSecure from "../../../../hooks/useGetSecure"
import UsersTableRow from "./UsersTableRow";


const ManageUsers = () => {

    const [searchString, setSearchString] = useState('');
    const [filter, setFilter] = useState('');


    const { data: users, refetch, isPending } = useGetSecure(["all-users"], `/users?search=${searchString}&filter=${filter}`);


    const handleSearch = (e) => {
        setSearchString(e.target.value);
    }

    const handleFilter = (e) => {
        setFilter(e.target.value);
    }


    useEffect(() => {
        refetch()
    }, [searchString, filter]);




    return <div className=" px-5 py-10 bg-white shadow rounded-lg min-h-screen">

        <h3 className="text-center font-semibold text-xl uppercase">Manage Users</h3>

        <div className=" mt-10 ">
            <div className="text-center">
                <input onChange={handleSearch} className="w-full py-3 md:w-1/2 bg-gray-50 border-2 border-slate-300 px-5  rounded-lg outline-none font-semibold" type="search" placeholder="Search by email..." />
            </div>
        </div>


        <div className='flex mt-8 mr-5 justify-end'>
            <select onChange={handleFilter} defaultValue='' value={filter} className='font-semibold outline-none cursor-pointer border bg-gray-100 px-3 rounded-md py-2' name="filter" id="filter">
                <option className='font-semibold text-gray-400' value='' disabled>Filter By</option>
                <option className='font-semibold' value="all">All</option>
                <option className='font-semibold' value="users">Users</option>
                <option className='font-semibold' value="author">Author</option>
                <option className='font-semibold' value="admin">Admin</option>
                <option className='font-semibold' value="new">New Users</option>
            </select>
        </div>


        <div className="my-10">
            {
                isPending ? <NoDataLoader /> :
                    users?.length > 0 ? <div className="overflow-x-auto">



                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Sl.</th>
                                        <th>Profile</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Manage</th>
                                        <th>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map((user, index) => <UsersTableRow key={user?._id} user={user} refetch={refetch} sl={index + 1} />)}
                                </tbody>


                            </table>
                        </div>




                    </div> :
                        <div>
                            <h3 className="text-center my-20 text-gray-400 font-semibold text-3xl">No active user found!</h3>
                        </div>
            }
        </div>











    </div >
}

export default ManageUsers