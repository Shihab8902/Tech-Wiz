import { useState } from "react"
import SectionTitle from "../../components/Section title/SectionTitle"

import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from 'sweetalert2';

import ConfettiExplosion from 'react-confetti-explosion';

const NewsLetter = () => {

    const [isExploding, setIsExploding] = useState(false);


    const axiosPublic = useAxiosPublic();


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = e.target;
        const email = formData.userEmail.value;

        const isExist = await (await axiosPublic.get(`/subscriber?email=${email}`)).data;



        if (isExist) {
            return Swal.fire("The user is already subscribed to our newsletter!");
        }

        axiosPublic.post(`/subscriber`, { email })
            .then(res => {

                if (res.data?.insertedId) {
                    setIsExploding(true);
                    Swal.fire({
                        title: "Thank You!",
                        text: "You are successfully subscribed to our newsletter!",
                        icon: "success"
                    });
                    formData.reset();

                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error"
                })
            })


    }




    return <div  >
        {isExploding && <ConfettiExplosion />}

        <SectionTitle title="Newsletter" />

        <form onSubmit={handleFormSubmit} className="p-10 border-dotted border-2 bg-gray-50 mt-5"  >
            <p className="text-sm text-medium text-gray-400">Stay in the know with our latest blog posts. Subscribe to our newsletter.</p>
            <input className="w-full font-semibold placeholder:font-normal p-3 border mt-5 border-slate-700 outline-none" type="email" name="userEmail" id="userEmail" placeholder="Enter your Email" required />
            <button type="submit" className="w-1/2 bg-green-600 text-white py-3 mt-3 font-semibold">Subscribe </button>
        </form>

    </div>
}

export default NewsLetter