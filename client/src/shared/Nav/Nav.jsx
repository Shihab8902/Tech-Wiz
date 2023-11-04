import React, { useState } from 'react'
import { Link } from 'react-router-dom'


import { BiMenu } from 'react-icons/bi';
import { BiLogoFacebook } from 'react-icons/bi';
import { BiLogoTwitter } from 'react-icons/bi';
import { BiLogoInstagram } from 'react-icons/bi';
import { AiOutlineMail } from 'react-icons/ai';
import { AiOutlineSearch } from 'react-icons/ai';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineClose } from 'react-icons/ai';



const Nav = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    return (
        <nav className=' container mx-auto py-10 lg:pt-10 lg:pb-5 flex justify-between items-center relative lg:border-b'>
            <div className='hidden lg:flex items-center text-xl gap-4  '>
                <Link className='hover:text-lime-500'><BiLogoFacebook /></Link>
                <Link className='hover:text-lime-500'><BiLogoTwitter /></Link>
                <Link className='hover:text-lime-500'><BiLogoInstagram /></Link>
                <Link className='hover:text-lime-500'><AiOutlineMail /></Link>
            </div>

            <div>
                <Link to="/" className='font-bold text-3xl'>Tech<span className='text-lime-500'>Wiz</span></Link>
            </div>

            <div >
                <div className='flex item-center gap-6'>
                    <button className='text-2xl'><AiOutlineSearch /></button>
                    <button className='text-2xl'><AiOutlineUserAdd /></button>
                    <button onClick={toggleMenu} className='text-2xl'><BiMenu /></button>



                    <div className={`fixed top-0 right-0 overflow-y-auto  h-full w-full md:w-3/4 lg:w-1/3 p-8  bg-slate-900 transition-transform transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>


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