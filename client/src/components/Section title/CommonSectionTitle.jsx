import { Link } from "react-router-dom"


const CommonSectionTitle = ({ title, category }) => {
    return <div className="flex items-center">
        <div className="mr-4">
            <p className="text-xl uppercase font-bold text-gray-800">{title}</p>
        </div>
        <div className="flex-1 border-t-2 border-gray-300"></div>

        <Link to={`/category/${category}`} className="font-semibold text-primary ml-2 text-lg ">Show all</Link>
    </div>
}

export default CommonSectionTitle