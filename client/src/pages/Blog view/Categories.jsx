import SectionTitle from "../../components/Section title/SectionTitle"
import { Link } from 'react-router-dom';


const Categories = () => {
    return <div className="my-10">
        <SectionTitle title="Categories" />

        <ul className="mt-5">

            <Link to="/gadgets-and-electronics"> <li className="flex justify-between py-4 uppercase font-bold border-b">Gadgets and electronics <span className="font-normal text-gray-500">{0}</span></li></Link>
            <Link to="/software-and-apps"> <li className="flex justify-between py-4 uppercase font-bold border-b">Software and apps <span className="font-normal text-gray-500">{0}</span></li></Link>
            <Link to="/how-to"> <li className="flex justify-between py-4 uppercase font-bold border-b">How to? <span className="font-normal text-gray-500">{0}</span></li></Link>
            <Link to="/tech-news"> <li className="flex justify-between py-4 uppercase font-bold border-b">Tech News <span className="font-normal text-gray-500">{0}</span></li></Link>
            <Link to="/programming-and-development"> <li className="flex justify-between py-4 uppercase font-bold border-b">Programming and development <span className="font-normal text-gray-500">{0}</span></li></Link>
            <Link to="/gaming-and-entertainment"> <li className="flex justify-between py-4 uppercase font-bold border-b">Gaming and entertainment <span className="font-normal text-gray-500">{0}</span></li></Link>

        </ul>

    </div>
}

export default Categories