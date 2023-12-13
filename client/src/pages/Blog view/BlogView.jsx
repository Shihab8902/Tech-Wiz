import { useEffect } from 'react'
import Nav from '../../shared/Nav/Nav'
import { useLoaderData } from 'react-router-dom'
import BlogBody from './BlogBody';
import BlogAside from './BlogAside';
import BlogBanner from './BlogBanner';

import NoDataLoader from '../../components/Loader/NoDataLoader';

const BlogView = () => {

    const blogData = useLoaderData()?.data;


    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [blogData]);





    return <section className='px-5 container mx-auto '>
        <Nav />

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