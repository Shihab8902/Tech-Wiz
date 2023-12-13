import { Form, Link, NavLink, Outlet } from "react-router-dom"
import { CgMenuLeftAlt } from "react-icons/cg";
import { BsFillBarChartFill } from "react-icons/bs";
import { FaRegListAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../../context/AuthProvider";
import { useState } from "react";
import Swal from "sweetalert2"
import "./dashboard.css"
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { updateProfile } from "firebase/auth";

const Dashboard = () => {
    const { user } = useContext(UserContext);
    const [image, setImage] = useState(user?.photoURL);
    const [isChanged, setIsChanged] = useState(false);
    const [modifiedImage, setModifiedImage] = useState(user?.photoURL);
    const [modifiedName, setModifiedName] = useState(user?.displayName);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();


    const navLinks = <>

        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/statistics"><BsFillBarChartFill /> Statistics</NavLink></li>
        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/compose"><FaPencilAlt /> Compose Blog</NavLink></li>
        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/statistics"><FaRegListAlt /> Manage Blogs</NavLink></li>
        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/statistics"><FaUsers /> Manage Users</NavLink></li>
        <li className="font-semibold text-lg mb-5">  <NavLink className="dashboard-link" to="/dashboard/statistics"><FaQuoteRight /> Comments</NavLink></li>


    </>


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setModifiedImage(file);
        setIsChanged(true);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



    const handleProfileUpdate = () => {
        const imageHostingAPIKey = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
        axiosPublic.post(`https://api.imgbb.com/1/upload?key=${imageHostingAPIKey}`, { image: modifiedImage }, {
            headers: {
                "content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                if (res.data?.success) {
                    const imageURL = res.data?.data.display_url;
                    axiosSecure.put(`/updateUser?email=${user?.email}`, { name: modifiedName, image: imageURL })
                        .then(res => {
                            if (res.data?.modifiedCount > 0) {
                                updateProfile(user, {
                                    displayName: modifiedName,
                                    photoURL: imageURL
                                })
                                    .then(() => {
                                        Swal.fire({
                                            position: "center",
                                            icon: "success",
                                            text: "Your profile has been updated successfully!",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        setImage(imageURL);
                                        setIsChanged(false);
                                    })
                            }
                        })
                }

            });
    }


    return <div className="drawer lg:drawer-open bg-gray-100 container mx-auto">
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

                        <input type="text" onChange={(e) => {
                            setIsChanged(true);
                            setModifiedName(e.target.value)
                        }} className="w-full font-bold outline-none px-5 py-3 mt-5 text-center rounded-lg " defaultValue={user?.displayName} minLength={2} />

                        <form method="dialog">
                            <button disabled={!isChanged} onClick={handleProfileUpdate} className="bg-green-600 hover:text-black btn w-full py-3 rounded-lg mt-5 text-white">Update Profile</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    </div>
}

export default Dashboard