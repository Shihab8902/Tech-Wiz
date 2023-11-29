import React from 'react'
import { GoDotFill } from "react-icons/go";
import { FaCommentDots, FaEye } from "react-icons/fa";


const BlogBanner = ({ blog }) => {
    const { image, category, title, publisher, publish_date, totalViews } = blog;




    return (

        <div className='h-[400px] w-full mt-5 '>
            <div style={{ backgroundImage: `url(${image})` }} className='w-full relative h-full bg-center bg-cover bg-no-repeat bg-fixed '>
                <div className='w-full h-full flex flex-col justify-end absolute bg-black bg-opacity-50 p-10 space-y-4'>
                    <p className="uppercase font-semibold text-green-500">{category}</p>
                    <h2 className="text-white text-3xl font-bold  ">{title}</h2>
                    <div className='flex items-center gap-3'>
                        <div className='text-white flex items-center gap-2'>
                            <p className='font-bold uppercase '>{publisher}</p> <GoDotFill />
                        </div>

                        <div className='text-white flex items-center gap-2'>
                            <p className=' uppercase '>{publish_date}</p> <GoDotFill />
                        </div>

                        <div className='text-white flex items-center gap-1'>
                            <p className=' uppercase '><FaCommentDots /></p> <span>0</span>
                        </div>

                        <div className='text-white flex items-center gap-1'>
                            <p className=' uppercase '><FaEye /></p> <span>{totalViews}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>





    )
}

export default BlogBanner