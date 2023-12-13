import { GoDotFill } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
    const navigate = useNavigate();
    const { image, category, title, publisher, publish_date, _id } = blog;

    return <Link to={`/blog/${_id}`}>
        <div className="cursor-pointer">

            <div className="sm:max-h-[176px] md:max-h-[450px] lg:h-40 overflow-hidden">
                <img className="w-full h-full hover:scale-105 transition-all duration-500" src={image} alt="Image Unavailable" />
            </div>
            <div className="mt-5">
                <p className="uppercase text-green-500 font-semibold text-sm mb-2">{category}</p>
                <h3 className=" text-xl hover:text-green-600 font-bold mb-5">{title?.length > 58 ? title.slice(0, 58) + "...." : title}</h3>
                <div className=" text-gray-400 text-sm flex items-center">
                    <p className="uppercase font-semibold">{publisher}</p> <p className="ml-1 mr-4"><GoDotFill /></p> <p>{publish_date}</p>
                </div>
            </div>


        </div>


    </Link>

}

export default BlogCard