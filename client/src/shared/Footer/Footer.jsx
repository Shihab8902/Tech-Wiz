import { AiOutlineMail } from "react-icons/ai"
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"
import useGetUserRole from "../../hooks/useGetUserRole"
import useHandleAuthorRequest from "../../hooks/useHandleAuthorRequest"
import Swal from "sweetalert2"
import { useContext } from "react"
import { UserContext } from "../../context/AuthProvider"

const Footer = () => {

    const { userRole } = useGetUserRole();

    const { user } = useContext(UserContext);

    const navigate = useNavigate();
    const authorRequestHandle = useHandleAuthorRequest();



    const handleRequestSend = () => {
        if (!user) {
            return Swal.fire({
                title: "Unavailable",
                text: "Please sign in to send an author request.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sign in"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/signin")
                }
            });
        }

        authorRequestHandle();
    }


    return <footer className="mt-20  bg-slate-800 w-full px-10 pt-10 pb-3 text-white ">
        <div className="container mx-auto px-3 md:px-5">
            <div className="flex flex-col gap-3 md:flex-row justify-between items-center">
                <div>
                    <p className='font-bold text-3xl text-center md:text-left'>Tech<span className='text-[#36d636]'>Wiz</span></p>
                    <p className="text-xs  font-medium">@ Created by <Link className="font-bold" to="https://webdevshihab.netlify.app">Shihab Hasan</Link></p>
                </div>

                <div>
                    {
                        (userRole === "admin" || userRole === "author") ?
                            <button onClick={() => navigate(userRole === "admin" ? "/dashboard/statistics" : "/dashboard/authorStats")} className='uppercase  text-white bg-green-600 rounded px-6 py-3 font-semibold my-3 text-center'>View Statistics</button>
                            :
                            <button onClick={handleRequestSend} className='uppercase text-white bg-green-600 rounded px-6 py-3 font-semibold my-3 text-center'>Become an author</button>
                    }
                </div>
            </div>

            <div className="flex mt-8 items-center justify-between">


                <div className='flex items-center w-full justify-center md:justify-start text-xl gap-4  '>
                    <Link className='hover:text-lime-500'><BiLogoFacebook /></Link>
                    <Link className='hover:text-lime-500'><BiLogoTwitter /></Link>
                    <Link className='hover:text-lime-500'><BiLogoInstagram /></Link>
                    <Link className='hover:text-lime-500'><AiOutlineMail /></Link>
                </div>
            </div>

            <p className="font-semibold text-sm text-center mt-5">&copy; Copyright 2024, TechWiz. All right reserved by the creator.</p>
        </div>
    </footer>
}

export default Footer