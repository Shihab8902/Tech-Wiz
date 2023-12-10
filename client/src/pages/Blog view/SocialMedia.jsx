import SectionTitle from "../../components/Section title/SectionTitle"
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaYoutube } from "react-icons/fa";

const SocialMedia = () => {
    return <div>
        <SectionTitle title="Social Media" />

        <div className="grid grid-cols-3 my-5">

            <div className="text-white w-full flex items-center justify-center flex-col gap-2 cursor-pointer h-32 md:h-40 bg-blue-900">
                <FaFacebook className="text-4xl" />
                <p className="font-semibold md:text-lg">Facebook</p>
            </div>

            <div className="text-white w-full flex items-center justify-center flex-col gap-2 cursor-pointer h-32 md:h-40 bg-blue-500">
                <RiTwitterXFill className="text-4xl" />
                <p className="font-semibold md:text-lg">Twitter</p>
            </div>

            <div className="text-white w-full flex items-center justify-center flex-col gap-2 cursor-pointer h-32 md:h-40 bg-red-600">
                <FaYoutube className="text-4xl" />
                <p className="font-semibold md:text-lg">YouTube</p>
            </div>


        </div>
    </div>
}

export default SocialMedia