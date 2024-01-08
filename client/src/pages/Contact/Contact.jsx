import { Helmet } from "react-helmet"
import Nav from "../../shared/Nav/Nav"

import image from '../../assets/images/contact.jpg';
import Swal from "sweetalert2";
import Footer from "../../shared/Footer/Footer";


const Contact = () => {


    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Your message was sent successfully. We will get back to you as soon as possible."
        });
        e.target.reset();
    }


    return <div >
        <Helmet>
            <title>TechWiz | Contact</title>
        </Helmet>

        <div className="px-3  md:px-5 container mx-auto min-h-screen">

            <Nav />

            <h3 className="uppercase my-10 font-bold text-3xl text-center">Contact Us</h3>

            <div className="flex flex-col lg:flex-row gap-10 justify-between items-center">
                <div className="flex-1 ">
                    <img className="w-full" src={image} alt="" />
                </div>



                <div className="flex-1">
                    <form onSubmit={handleSubmit}>
                        <input className="w-full py-3 border-2 outline-none px-5 rounded" type="text" name="name" id="name" placeholder="Enter your name" required />
                        <input className="w-full my-10 py-3 border-2 outline-none px-5 rounded" type="email" name="email" id="email" placeholder="Enter your email" required />
                        <textarea name="message" id="message" className="w-full h-[200px] border-2 rounded px-5 py-3 resize-none outline-none" required placeholder="Message"></textarea>

                        <button className=' px-10 border mt-5 bg-green-600 rounded text-white py-3 '>Send Message</button>

                    </form>
                </div>

            </div>
        </div>



        <Footer />

    </div>
}

export default Contact