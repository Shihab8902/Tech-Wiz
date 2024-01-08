import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom'

import './subNav.css'

const SubNav = () => {
    return (

        <nav className='py-8 border-b hidden lg:block bg-slate-200 container mx-auto'>
            <ul className=' flex justify-evenly uppercase text-sm '>
                <li className='font-bold '><Link className="hover:underline cursor-pointer" spy={true} smooth={true} offset={50} duration={500} to="gadgetAndElectronics">Gadgets and Electronics</Link></li>
                <li className='font-bold '><Link className="hover:underline cursor-pointer" spy={true} smooth={true} offset={50} duration={500} to="software-and-apps">Software and Apps</Link></li>
                <li className='font-bold '><Link className="hover:underline cursor-pointer" spy={true} smooth={true} offset={50} duration={500} to="how-to">How to?</Link></li>
                <li className='font-bold '><Link className="hover:underline cursor-pointer" spy={true} smooth={true} offset={50} duration={500} to="tech-news">Tech News</Link></li>
                <li className='font-bold '><Link className="hover:underline cursor-pointer" spy={true} smooth={true} offset={50} duration={500} to="programming-and-development">Programming and Development</Link></li>
                <li className='font-bold '><Link className="hover:underline cursor-pointer" spy={true} smooth={true} offset={50} duration={500} to="gaming-and-entertainment">Gaming and Entertainment</Link></li>
            </ul>
        </nav>

    )
}

export default SubNav