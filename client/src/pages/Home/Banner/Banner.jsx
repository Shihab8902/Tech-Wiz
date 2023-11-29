import { Link } from "react-router-dom";
import useBlogMostViewed from "../../../hooks/useBlogMostViewed"
import { GoDotFill } from "react-icons/go";
import NoDataLoader from "../../../components/Loader/NoDataLoader";



const Banner = () => {
    const { mostViewedBlogs } = useBlogMostViewed();

    const banner1 = mostViewedBlogs?.[0];
    const banner2 = mostViewedBlogs?.[1];
    const banner3 = mostViewedBlogs?.[2];





    return <div>
        {
            mostViewedBlogs?.length > 0 ? <div className="lg:my-10 container mx-auto">

                <div className="hidden lg:grid grid-cols-3 grid-rows-2 gap-2 h-[500px]">


                    <Link to={`/blog/${banner1?._id}`} className="col-span-2 row-span-2 relative block">
                        <img className="w-full h-full" src={banner1?.image} alt="" />
                        <div className="absolute w-full top-0 left-0 bg-opacity-60 flex items-end h-full bg-black">
                            <div className="p-10 space-y-3">
                                <p className="uppercase text-[#3cec3c] font-bold">{banner1?.category}</p>
                                <h3 className="text-white font-bold hover:text-[#45ce45] text-3xl">{banner1?.title}</h3>
                                <div className="text-white flex items-center">
                                    <p className="uppercase font-semibold">{banner1?.publisher}</p> <p className="ml-1 mr-4"><GoDotFill /></p> <p>{banner1?.publish_date}</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to={`/blog/${banner2?._id}`} className=" relative block">
                        <img className="w-full h-full" src={banner2?.image} alt="" />
                        <div className="absolute w-full top-0 left-0 bg-opacity-60 flex items-end h-full bg-black">
                            <div className="p-10 space-y-3">
                                <p className="uppercase text-[#3cec3c] font-bold">{banner2?.category}</p>
                                <h3 className="text-white font-bold hover:text-[#45ce45] text-2xl">
                                    {banner2?.title.length > 43 ? banner2.slice(0, 43) + "..." : banner2?.title

                                    }</h3>
                                <div className="text-white flex items-center">
                                    <p className="uppercase font-semibold">{banner2?.publisher}</p> <p className="ml-1 mr-4"><GoDotFill /></p> <p>{banner1?.publish_date}</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to={`/blog/${banner3?._id}`} className=" relative block">
                        <img className="w-full h-full" src={banner3?.image} alt="" />
                        <div className="absolute w-full top-0 left-0 bg-opacity-60 flex items-end h-full bg-black">
                            <div className="p-10 space-y-3">
                                <p className="uppercase text-[#3cec3c] font-bold">{banner3?.category}</p>
                                <h3 className="text-white font-bold hover:text-[#45ce45] text-2xl">
                                    {banner3?.title.length > 43 ? banner3.slice(0, 43) + "..." : banner3?.title

                                    }</h3>
                                <div className="text-white flex items-center">
                                    <p className="uppercase font-semibold">{banner3?.publisher}</p> <p className="ml-1 mr-4"><GoDotFill /></p> <p>{banner1?.publish_date}</p>
                                </div>
                            </div>
                        </div>
                    </Link>


                </div>


                <div className="lg:hidden space-y-2">

                    <Link to={`/blog/${banner1?._id}`} className=" relative block ">
                        <img className="w-full h-full" src={banner1?.image} alt="" />
                        <div className="absolute w-full top-0 left-0 bg-opacity-60 flex items-end h-full bg-black">
                            <div className="p-2 md:p-10 space-y-3">
                                <p className="uppercase text-[#3cec3c] font-bold">{banner1?.category}</p>
                                <h3 className="text-white font-bold hover:text-[#45ce45] text-xl md:text-3xl"> {banner1?.title.length > 43 ? banner1.slice(0, 43) + "..." : banner1?.title}</h3>
                                <div className="text-white flex items-center">
                                    <p className="uppercase font-semibold">{banner1?.publisher}</p> <p className="ml-1 mr-4"><GoDotFill /></p> <p>{banner1?.publish_date}</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to={`/blog/${banner2?._id}`} className=" relative block">
                        <img className="w-full h-full" src={banner2?.image} alt="" />
                        <div className="absolute w-full top-0 left-0 bg-opacity-60 flex items-end h-full bg-black">
                            <div className="p-2 md:p-10 space-y-3">
                                <p className="uppercase text-[#3cec3c] font-bold">{banner2?.category}</p>
                                <h3 className="text-white font-bold hover:text-[#45ce45] text-xl md:text-3xl"> {banner2?.title.length > 43 ? banner2.slice(0, 43) + "..." : banner2?.title}</h3>
                                <div className="text-white flex items-center">
                                    <p className="uppercase font-semibold">{banner2?.publisher}</p> <p className="ml-1 mr-4"><GoDotFill /></p> <p>{banner2?.publish_date}</p>
                                </div>
                            </div>
                        </div>
                    </Link>


                    <Link to={`/blog/${banner3?._id}`} className=" relative block">
                        <img className="w-full h-full" src={banner3?.image} alt="" />
                        <div className="absolute w-full top-0 left-0 bg-opacity-60 flex items-end h-full bg-black">
                            <div className="p-2 md:p-10 space-y-3">
                                <p className="uppercase text-[#3cec3c] font-bold">{banner3?.category}</p>
                                <h3 className="text-white font-bold hover:text-[#45ce45] text-xl md:text-3xl"> {banner3?.title.length > 43 ? banner3.slice(0, 43) + "..." : banner3?.title}</h3>
                                <div className="text-white flex items-center">
                                    <p className="uppercase font-semibold">{banner3?.publisher}</p> <p className="ml-1 mr-4"><GoDotFill /></p> <p>{banner3?.publish_date}</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                </div>

            </div> : <NoDataLoader />


        }
    </div>


}

export default Banner