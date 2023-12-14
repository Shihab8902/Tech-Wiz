import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const ManageBlogCard = ({ blog }) => {
    const { image, category, title, publisher, publish_date, _id } = blog;

    return <div >

        <div className="sm:max-h-[176px] md:h-48 lg:h-40 overflow-hidden cursor-pointer">
            <img className="w-full h-full hover:scale-105 transition-all duration-500" src={image} alt="Image Unavailable" />
        </div>
        <div className="mt-5">
            <div className="flex items-center justify-between">
                <p className="uppercase text-green-500 font-semibold text-sm mb-2">{category}</p>
                <button className="text-xl text-red-500"><MdDelete /></button>
            </div>
            <Link to={`/blog/${_id}`}><h3 className=" text-xl hover:text-green-600 font-bold mb-5">{title?.length > 40 ? title.slice(0, 40) + "...." : title}</h3></Link>
            <div className=" text-gray-400 text-sm flex items-center">
                <p className="uppercase font-semibold">{publisher}</p> <p className="ml-1 mr-4"><GoDotFill /></p> <p>{publish_date}</p>
            </div>
        </div>


    </div>




}

export default ManageBlogCard