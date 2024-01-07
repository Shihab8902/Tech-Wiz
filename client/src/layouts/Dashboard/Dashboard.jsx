import { Link, NavLink, Outlet } from "react-router-dom"
import { CgMenuLeftAlt } from "react-icons/cg";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoIosJournal } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { FaPenNib } from "react-icons/fa";

import "./dashboard.css"
import UserProfile from "../../components/User Profile/UserProfile";

const Dashboard = () => {


    const navLinks = <>

        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/statistics"><BsFillBarChartFill /> Statistics</NavLink></li>
        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/myblogs"><IoIosJournal /> My Blogs</NavLink></li>
        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/compose"><FaPencilAlt /> Compose Blog</NavLink></li>
        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/manageBlogs"><FaRegListAlt /> Manage Blogs</NavLink></li>
        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/manageUsers"><FaUsers /> Manage Users</NavLink></li>
        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/authorRequests"><FaPenNib /> Author Requests</NavLink></li>


    </>








    return <div className="drawer lg:drawer-open bg-gray-100 container mx-auto">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content overflow-x-auto">
            {/* Drawer button */}
            <div className=" lg:hidden  p-3">
                <label htmlFor="my-drawer-2" className="text-3xl drawer-button "><CgMenuLeftAlt /></label>
            </div>

            {/* Render Outlet */}
            <div className="m-4">
                <Outlet />
            </div>

        </div>
        {/* Drawer sidebar */}
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full z-30 bg-white shadow ">
                <div className=" mb-10 flex items-center justify-between">
                    <Link to="/" className='font-bold text-3xl'>Tech<span className='text-[#36d636]'>Wiz</span></Link>

                    {/* User image and name */}
                    <UserProfile />
                </div>
                {
                    navLinks
                }
            </ul>


        </div>
    </div>
}

export default Dashboard