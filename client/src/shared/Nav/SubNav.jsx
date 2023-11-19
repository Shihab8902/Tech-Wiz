import React from 'react'
import { NavLink } from 'react-router-dom'

import './subNav.css'

const SubNav = () => {
    return (

        <nav className='py-8 border-b hidden lg:block bg-slate-200 container mx-auto'>
            <ul className=' flex justify-evenly uppercase text-sm '>
                <li className='font-bold '><NavLink className="hover:underline " to="/gadgets-and-electronics">Gadgets and Electronics</NavLink></li>
                <li className='font-bold '><NavLink className="hover:underline " to="/software-and-apps">Software and Apps</NavLink></li>
                <li className='font-bold '><NavLink className="hover:underline " to="/how-to">How to?</NavLink></li>
                <li className='font-bold '><NavLink className="hover:underline " to="/tech-news">Tech News</NavLink></li>
                <li className='font-bold '><NavLink className="hover:underline " to="/programming-and-development">Programming and Development</NavLink></li>
                <li className='font-bold '><NavLink className="hover:underline " to="/gaming-and-entertainment">Gaming and Entertainment</NavLink></li>
            </ul>
        </nav>

    )
}

export default SubNav