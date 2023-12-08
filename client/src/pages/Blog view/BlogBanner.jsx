import React from 'react'
import { GoDotFill } from "react-icons/go";
import { FaCommentDots, FaEye } from "react-icons/fa";


const BlogBanner = ({ blog }) => {
    const { image, category, title, publisher, publish_date, totalViews } = blog;


    return <div className='w-full h-[200px] rounded-lg md:h-[400px] bg-cover bg-no-repeat bg-center ' style={{ backgroundImage: `url(${image})` }}>
        <div className='w-full h-full rounded-lg flex flex-col justify-end bg-black bg-opacity-70 p-2 md:p-10'>
            <div className='lg:w-3/4 space-y-4 md:space-y-5 lg:space-y-6'>
                <p className="uppercase text-[11px] md:text-base text-[#3cec3c] font-bold">{category}</p>
                <h3 className='text-base md:text-3xl lg:text-4xl font-bold text-slate-100 leading-tight'>{title}</h3>
                <div className="text-slate-100 flex items-center text-[10px] md:text-base">
                    <p className="uppercase font-semibold">{publisher}</p> <p className="ml-1 mr-3"><GoDotFill /></p> <p className='flex items-center'>{publish_date} <GoDotFill /></p>
                    <p className='flex items-center gap-1 ml-3'> <FaCommentDots />{0} </p> <GoDotFill /> <p className='flex items-center gap-1 ml-3'><FaEye /> {totalViews}</p>
                </div>
            </div>
        </div>
    </div>



}

export default BlogBanner