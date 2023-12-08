import PropType from "prop-types";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

const RecentPostCard = ({ blog }) => {
    const { image, title, category, publisher, publish_date, _id } = blog;
    // console.log(blog)


    return <Link to={`/blog/${_id}`}>

        <div className="cursor-pointer">
            <div className="w-full h-[300px] relative overflow-hidden">
                <img className="w-full h-full hover:scale-105 transition-all duration-500" src={image} alt={title} />
                <div className="bg-white absolute bottom-0 left-3 w-full p-5">
                    <p className="uppercase text-green-500 font-semibold text-sm">{category}</p>
                </div>
            </div>

            <h3 className="ml-8 text-xl hover:text-green-600 font-bold">{title?.length > 58 ? title.slice(0, 58) + "...." : title}</h3>

            <div className="ml-8 mt-5 text-gray-400 text-sm flex items-center">
                <p className="uppercase font-semibold">{publisher}</p> <p className="ml-1 mr-4"><GoDotFill /></p> <p>{publish_date}</p>
            </div>
        </div>


    </Link>


}


RecentPostCard.propTypes = {
    blog: PropType.object
}

export default RecentPostCard