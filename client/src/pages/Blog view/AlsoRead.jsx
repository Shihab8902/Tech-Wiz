import NoDataLoader from "../../components/Loader/NoDataLoader";
import SectionTitle from "../../components/Section title/SectionTitle";
import useGetPublic from "../../hooks/useGetPublic";

const AlsoRead = () => {

    const { data: blogs, isPending } = useGetPublic(["random-blogs"], `/randomBlogs`);




    return <div className="mt-10">
        <SectionTitle title="Also Read" />


        <div>
            {
                isPending ? <NoDataLoader />
                    : blogs?.length > 0 ?
                        <div className="mt-10">
                            {
                                blogs?.map(blog => {

                                    const { image, category, title } = blog;

                                    return <div key={blog?._id} className="cursor-pointer flex items-center gap-2 mb-8 ">
                                        <div className="overflow-hidden w-24 h-24 flex-shrink-0">
                                            <img className="w-24 h-24   hover:scale-110 transition-all duration-700 " src={image} alt="" />
                                        </div>

                                        <div >
                                            <p className="uppercase text-green-500 font-semibold text-sm mb-2">{category}</p>
                                            <h3 className="  hover:text-green-600 font-bold mb-5">{title?.length > 70 ? title.slice(0, 70) + "...." : title}</h3>
                                        </div>
                                    </div>


                                })
                            }
                        </div>

                        : ""
            }
        </div>



    </div>


}

export default AlsoRead