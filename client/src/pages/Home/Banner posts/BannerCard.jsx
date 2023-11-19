import React from 'react'
import { GoDotFill } from "react-icons/go";

const BannerCard = ({ blog }) => {
    const { image, category, title, publisher, publish_date } = blog;



    return <div className="relative w-full h-full overflow-hidden group cursor-pointer ">
        <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 transform scale-100 group-hover:scale-105"
            style={{
                backgroundImage: `url(${image})`,
            }}
        ></div>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end  p-10">
            <p className=" mb-7 uppercase font-semibold text-green-500">{category}</p>
            <h2 className="text-white text-3xl font-bold mb-2 hover:text-green-500">{
                title.length > 35 ? title.slice(0, 35) + "..." : title
            }</h2>

            <div className='text-white mt-3 flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                    <p className='uppercase font-bold'>{publisher}</p> <GoDotFill />
                </div>
                <p>{publish_date}</p>
            </div>
        </div>
    </div>
}

export default BannerCard