import { Link, NavLink, Outlet } from "react-router-dom"
import { CgMenuLeftAlt } from "react-icons/cg";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../../context/AuthProvider";
import { useState } from "react";

import "./dashboard.css"

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [image, setImage] = useState(user?.photoURL);

    const navLinks = <>

        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/statistics"><BsFillBarChartFill /> Statistics</NavLink></li>
        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/compose"><FaPencilAlt /> Compose Blog</NavLink></li>
        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/statistics"><FaRegListAlt /> Manage Blogs</NavLink></li>
        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/statistics"><FaUsers /> Manage Users</NavLink></li>
        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/statistics"><FaQuoteRight /> Comments</NavLink></li>


    </>


    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };


    return <div className="drawer lg:drawer-open bg-gray-100">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
            <div className=" lg:hidden  p-3">
                <label htmlFor="my-drawer-2" className="text-3xl drawer-button "><CgMenuLeftAlt /></label>
            </div>

            <div className="m-4">
                <Outlet />
            </div>

        </div>
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-white shadow">
                <div className=" mb-10 flex items-center justify-between">
                    <Link to="/" className='font-bold text-3xl'>Tech<span className='text-[#36d636]'>Wiz</span></Link>

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-8 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={user?.photoURL || "https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp"} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <p className='text-center font-bold my-4'>{user?.displayName || "User"}</p>
                            <button onClick={() => document.getElementById('my_modal_3').showModal()} className=" font-semibold bg-blue-600 py-2 mb-4 text-white rounded-full">Edit Profile</button>
                        </ul>
                    </div>
                </div>
                {
                    navLinks
                }
            </ul>

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div >
                        <div className="relative overflow-hidden w-[80px] h-[80px] rounded-full mx-auto">
                            <img src={image || 'https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp'} alt="User" className="w-full h-full rounded-full" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>

                        <input type="text" className="w-full font-bold outline-none px-5 py-3 mt-5 text-center rounded-lg " defaultValue={user?.displayName} />

                        <div>
                            <button className="bg-green-600 w-full py-3 rounded-lg mt-5 text-white">Update Profile</button>
                        </div>
                    </div>
                </div>
            </dialog>

        </div>
    </div>
}

export default Dashboard