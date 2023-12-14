import { useEffect, useState } from "react";
import BlogCard from "../../../../components/Blog card/BlogCard";
import NoDataLoader from "../../../../components/Loader/NoDataLoader";
import useGetPublic from "../../../../hooks/useGetPublic"
import ManageBlogCard from "./ManageBlogCard";

const ManageBlogs = () => {
    const [searchString, setSearchString] = useState('');
    const [filterValue, setFilterValue] = useState('');
    // pagination
    const blogsPerPage = 6;
    const { data: blogCount } = useGetPublic(["blogCount"], `/totalBlogs`);
    const totalPages = Math.ceil(blogCount?.total / blogsPerPage) || 0;
    const [currentPage, setCurrentPage] = useState(0);
    const pages = [...Array(totalPages).keys()];

    const { data: blogs, refetch, isLoading } = useGetPublic(["allBlogs"], `/blogs?search=${searchString}&filter=${filterValue}&page=${currentPage}&limit=${blogsPerPage}`);









    useEffect(() => {
        refetch();
    }, [searchString, filterValue, currentPage]);







    return (
        <div className=" px-5 py-10 bg-white shadow rounded-lg min-h-screen">

            <h3 className="text-center font-semibold text-xl uppercase">Manage Blogs</h3>


            <div className=" mt-10 ">
                <div className="text-center">
                    <input onChange={(e) => setSearchString(e.target.value)} className="w-full py-3 md:w-1/2 bg-gray-50 border-2 border-slate-300 px-5  rounded-lg outline-none font-semibold" type="search" placeholder="Search..." />
                </div>
            </div>

            <div className='flex mt-8 mr-5 justify-end'>
                <select onChange={(e) => setFilterValue(e.target.value)} value={filterValue} className='font-semibold outline-none cursor-pointer border bg-gray-100 px-3 rounded-md py-2' name="filter" id="filter">
                    <option className='font-semibold text-gray-400' value='' disabled>Filter By</option>
                    <option className='font-semibold' value="all">All</option>
                    <option className='font-semibold' value="recent">Recently Added</option>
                    <option className='font-semibold' value="popular">Most Popular</option>
                </select>
            </div>



            {
                isLoading ? <NoDataLoader /> :
                    blogs?.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-y-8 gap-x-6 mt-8">
                        {
                            blogs.map(blog => <ManageBlogCard key={blog._id} blog={blog} />)
                        }



                    </div> :

                        <div className="mt-10">
                            <p className="text-2xl font-bold text-gray-500 text-center">No blog posts found!</p>
                        </div>
            }




            <div className="text-center">

                <div className=" mt-14  join">
                    <button onClick={() => {
                        if (currentPage > 0) {
                            setCurrentPage(currentPage - 1);
                        }
                    }} className="join-item btn">«</button>

                    {
                        pages?.map(page => {

                            return <button key={page}
                                className={`join-item btn ${currentPage === page && "bg-green-500 hover:text-black text-white"}`}
                                onClick={() => setCurrentPage(page)}
                            >{page}</button>
                        })
                    }
                    <button onClick={() => {
                        if (currentPage < pages.length - 1) {
                            setCurrentPage(currentPage + 1);
                        }
                    }} className="join-item btn">»</button>


                </div>


            </div>









        </div>
    )
}

export default ManageBlogs