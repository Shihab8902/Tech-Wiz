import { Helmet } from "react-helmet"
import Nav from "../../shared/Nav/Nav"
import Footer from "../../shared/Footer/Footer"
import image from '../../assets/images/about.jpg';



const About = () => {
    return <div >

        <Helmet>
            <title>TechWiz | About</title>
        </Helmet>

        <div className="px-3  md:px-5 container mx-auto min-h-screen">
            <Nav />

            <div className="flex flex-col-reverse lg:flex-row gap-10 justify-between items-center">
                <div className="flex-1">
                    <h3 className="uppercase font-bold text-3xl">About us</h3>

                    <div>
                        <p className="font-semibold  leading-8 mt-4 text-justify">
                            At TechWiz, we're passionate about technology without the clutter. Say goodbye to ads and messy layouts; we're here to provide you with a clean, polished tech experience.

                            Our mission is straightforward: deliver quality content without overwhelming you. We focus on what matters—insights, guides, and the latest in tech, presented in a sleek design.

                            TechWiz isn't just a blog; it's a community. Join us in vibrant discussions, share your thoughts, and stay updated on tech trends. Our team of passionate tech enthusiasts is dedicated to making your tech journey enjoyable.

                            Explore, learn, and engage with TechWiz. Follow us on social media, subscribe to our newsletter, and be part of a community that values knowledge and simplicity.

                            Welcome to TechWiz—where technology meets elegance.
                        </p>

                    </div>
                </div>

                <div className="flex-1 ">
                    <img className="w-full" src={image} alt="" />
                </div>
            </div>
        </div>





        <Footer />


    </div>
}

export default About