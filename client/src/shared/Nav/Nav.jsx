import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BiMenu } from 'react-icons/bi';
import { BiLogoFacebook } from 'react-icons/bi';
import { BiLogoTwitter } from 'react-icons/bi';
import { BiLogoInstagram } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';
import { useContext } from 'react';
import { UserContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2';
import useGetUserRole from '../../hooks/useGetUserRole';



const Nav = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const { user, userLogOut } = useContext(UserContext);
    const { userRole } = useGetUserRole();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    const handleUserSignOut = () => {
        Swal.fire({
            title: "Sign out?",
            text: "Are you sure want to sign out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            cancelButtonColor: "green",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                userLogOut()
                    .then(() => {
                        Swal.fire({
                            position: "Center",
                            icon: "success",
                            title: "Signed out!",
                            showConfirmButton: false,
                            timer: 1500
                        });
                        navigate("/")
                    })
            }
        });
    }


    return (
        <nav className=' container  mx-auto py-10 lg:pt-10 lg:pb-5 flex justify-between items-center relative lg:border-b'>
            <div className='hidden lg:flex items-center text-xl gap-4  '>
                <Link className='hover:text-lime-500'><BiLogoFacebook /></Link>
                <Link className='hover:text-lime-500'><BiLogoTwitter /></Link>
                <Link className='hover:text-lime-500'><BiLogoInstagram /></Link>
                <Link className='hover:text-lime-500'><AiOutlineMail /></Link>
            </div>

            <div>
                <Link to="/" className='font-bold text-3xl'>Tech<span className='text-[#36d636]'>Wiz</span></Link>
            </div>

            <div >
                <div className='flex item-center gap-6'>
                    <button className='text-2xl'><AiOutlineSearch /></button>
                    {
                        user ?
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-8 rounded-full">
                                        <img alt="Tailwind CSS Navbar component" src={user?.photoURL || "https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp"} />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                    <p className='text-center font-bold '>{user?.displayName || "User"}</p>

                                    {
                                        userRole === "admin" ? <Link to="/dashboard" className='text-center uppercase text-primary font-semibold my-3 hover:underline'>Dashboard</Link>
                                            : userRole === "author" ? <Link to="/dashboard" className='text-center uppercase text-primary font-semibold my-3 hover:underline'>Dashboard</Link> :
                                                <Link to="/profile" className='text-center uppercase text-primary font-semibold my-3 hover:underline'>Profile</Link>
                                    }


                                    <button onClick={handleUserSignOut} className='w-full font-semibold text-xs bg-red-500 text-white py-2 rounded-full'>Sign Out</button>
                                </ul>
                            </div>


                            : <Link to="/signin"><button className='text-2xl'><AiOutlineUserAdd /></button></Link>

                    }
                    <button onClick={toggleMenu} className='text-2xl'><BiMenu /></button>



                    <div className={`fixed top-0 right-0 overflow-y-auto  h-full w-full md:w-3/4 lg:w-1/3 p-8 z-20  bg-slate-900 transition-transform transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>


                        <button className="p-4 flex text-2xl pt-5  pr-5  text-white justify-end w-full" onClick={toggleMenu}>
                            <AiOutlineClose />
                        </button>

                        <ul>

                            <li className='text-white text-lg  py-5 border-b border-slate-700'>
                                <Link className="hover:underline " to="/">Home</Link>
                            </li>

                            <li tabIndex={0} className='text-white text-lg  py-5 border-b border-slate-700 '>
                                <details>
                                    <summary className='cursor-pointer'>Categories</summary>
                                    <ul className="ml-10 pl-3 ">
                                        <li className='text-white text-lg list-disc  py-5 border-b border-slate-700'><Link className="hover:underline" to="/gadgets-and-electronics">Gadgets and Electronics</Link></li>
                                        <li className='text-white text-lg  list-disc py-5 border-b border-slate-700'><Link className="hover:underline" to="/software-and-apps">Software and Apps</Link></li>
                                        <li className='text-white text-lg  list-disc py-5 border-b border-slate-700'><Link className="hover:underline" to="/how-to">How to?</Link></li>
                                        <li className='text-white text-lg  list-disc py-5 border-b border-slate-700'><Link className="hover:underline" to="/tech-news">Tech News</Link></li>
                                        <li className='text-white   list-disc py-5 border-b text-base border-slate-700'><Link className="hover:underline" to="/programming-and-development">Programming and Development</Link></li>
                                        <li className='text-white text-lg  list-disc py-5 border-b border-slate-700'><Link className="hover:underline" to="/gaming-and-entertainment">Gaming and Entertainment</Link></li>
                                    </ul>
                                </details>
                            </li>

                            <li className='text-white text-lg  py-5 border-b border-slate-700'>
                                <Link className="hover:underline " to="/about">About Us</Link>
                            </li>

                            <li className='text-white text-lg  py-5 border-b border-slate-700'>
                                <Link className="hover:underline " to="/contact">Contacts</Link>
                            </li>

                            <li className='text-white text-lg  py-5 border-b border-slate-700'>
                                <Link className="hover:underline " to="/advertise">Advertise</Link>
                            </li>
                        </ul>

                    </div>
                </div>





            </div>


        </nav >




    )
}

export default Nav