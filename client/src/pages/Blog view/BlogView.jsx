import React from 'react'
import Nav from '../../shared/Nav/Nav'
import { useLoaderData } from 'react-router-dom'
import BlogBody from './BlogBody';
import BlogAside from './BlogAside';
import BlogBanner from './BlogBanner';

const BlogView = () => {
    const { data: blogData } = useLoaderData();





    return <section className='px-5 container mx-auto'>
        <Nav />

        <BlogBanner key={1} blog={blogData} />

        <div className='grid grid-cols-3 gap-6 my-5 '>
            <div className='col-span-2'>
                <BlogBody key={blogData._id} blog={blogData} />
            </div>
            <div>
                <BlogAside />
            </div>
        </div>

    </section>
}

export default BlogView