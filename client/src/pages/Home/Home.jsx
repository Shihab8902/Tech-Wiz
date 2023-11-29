import { motion } from 'framer-motion';

import Nav from '../../shared/Nav/Nav'
import SubNav from '../../shared/Nav/SubNav'
import Banner from './Banner/Banner'
import SectionDivider from './Section divider/SectionDivider'
import { useEffect, useState } from "react"






const Home = () => {

    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            const progress = (currentScroll / scrollHeight) * 100;
            setScrollProgress(progress);
        }

        window.addEventListener('scroll', updateScrollProgress);

        return () => window.removeEventListener('scroll', updateScrollProgress);

    }, [])


    console.log(scrollProgress);

    return <>
        <motion.div
            className="fixed top-0 left-0 w-0 h-[5px] bg-[#4CAF50]  transition-all duration-300 ease-in z-[1000]"
            style={{
                width: `${scrollProgress}%`,
                height: '5px',
                background: '#4CAF50', // Green color as an example
            }}
        />


        <div className='px-2  md:px-5'>
            <Nav />
            <SubNav />
            <Banner />
            <SectionDivider />

        </div>



    </>





}

export default Home