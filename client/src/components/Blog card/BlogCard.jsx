import { GoDotFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const BlogCard = ({ blog }) => {
    const { image, category, title, publisher, publish_date, _id } = blog;

    useEffect(() => {
        AOS.init({
            duration: 800
        });
    }, [])

    return <Link to={`/blog/${_id}`}>
        <div className="cursor-pointer" data-aos="fade-up">

            <div className="sm:max-h-[176px] md:max-h-[450px] lg:h-40 overflow-hidden">
                <img className="w-full h-full hover:scale-105 transition-all duration-500" src={image} alt="Image Unavailable" />
            </div>
            <div className="mt-5">
                <p className="uppercase text-green-500 font-semibold text-sm mb-2">{category}</p>
                <h3 className=" text-xl hover:text-green-600 font-bold mb-5">{title?.length > 40 ? title.slice(0, 40) + "...." : title}</h3>
                <div className=" text-gray-400 text-sm flex items-center">
                    <p className="uppercase font-semibold">{publisher}</p> <p className="ml-1 mr-4"><GoDotFill /></p> <p>{publish_date}</p>
                </div>
            </div>


        </div>


    </Link>

}

export default BlogCard