import SectionTitle from "../../components/Section title/SectionTitle"
import { Link } from 'react-router-dom';
import useGetPublic from "../../hooks/useGetPublic";


const Categories = () => {

    const { data: blogCount } = useGetPublic(["blog-count"], `/menuBlogCount`);

    return <div className="my-10">
        <SectionTitle title="Categories" />

        <ul className="mt-5">

            <Link to="/category/gadgets and electronics"> <li className="flex justify-between py-4 uppercase font-bold border-b">Gadgets and electronics <span className="font-normal text-gray-500">{blogCount?.["gadgets and electronics"]}</span></li></Link>
            <Link to="/category/software and apps"> <li className="flex justify-between py-4 uppercase font-bold border-b">Software and apps <span className="font-normal text-gray-500">{blogCount?.["software and apps"]}</span></li></Link>
            <Link to="/category/how to"> <li className="flex justify-between py-4 uppercase font-bold border-b">How to? <span className="font-normal text-gray-500">{blogCount?.["how to"]}</span></li></Link>
            <Link to="/category/tech news"> <li className="flex justify-between py-4 uppercase font-bold border-b">Tech News <span className="font-normal text-gray-500">{blogCount?.["tech news"]}</span></li></Link>
            <Link to="/category/programming and development"> <li className="flex justify-between py-4 uppercase font-bold border-b">Programming and development <span className="font-normal text-gray-500">{blogCount?.["programming and development"]}</span></li></Link>
            <Link to="/category/gaming and entertainment"> <li className="flex justify-between py-4 uppercase font-bold border-b">Gaming and entertainment <span className="font-normal text-gray-500">{blogCount?.["gaming and entertainment"]}</span></li></Link>

        </ul>

    </div>
}

export default Categories