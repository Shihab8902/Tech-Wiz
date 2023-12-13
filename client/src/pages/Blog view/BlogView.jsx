import { useEffect, useState } from 'react'
import Nav from '../../shared/Nav/Nav'
import { useLoaderData } from 'react-router-dom'
import BlogBody from './BlogBody';
import BlogAside from './BlogAside';
import BlogBanner from './BlogBanner';
import { motion } from 'framer-motion';

import NoDataLoader from '../../components/Loader/NoDataLoader';

const BlogView = () => {

    const blogData = useLoaderData()?.data;


    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [blogData]);


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




    return <section className='px-5 container mx-auto '>
        <Nav />


        <motion.div
            className="fixed top-0 left-0 w-0 h-[5px] bg-[#4CAF50]  transition-all duration-300 ease-in z-[1000]"
            style={{
                width: `${scrollProgress}%`,
                height: '5px',
                background: '#4CAF50',
            }}
        />


        {
            blogData?.length < 0 ? <NoDataLoader /> : <>


                <BlogBanner key={1} blog={blogData} />

                <div className='grid lg:grid-cols-3 gap-8  my-10'>
                    <div className='lg:col-span-2'>
                        <BlogBody key={blogData._id} blog={blogData} />
                    </div>
                    <div>
                        <BlogAside />
                    </div>
                </div>

            </>
        }

    </section>
}

export default BlogView