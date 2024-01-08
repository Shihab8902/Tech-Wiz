import { useParams } from "react-router-dom"
import Nav from "../../shared/Nav/Nav";
import SectionTitle from "../Section title/SectionTitle";
import { createRef, useEffect, useState } from "react";
import useGetPublic from "../../hooks/useGetPublic";
import NoDataLoader from "../Loader/NoDataLoader";
import BlogCard from "../Blog card/BlogCard";

const BlogPosts = () => {
    const category = useParams().category;

    const [filter, setFilter] = useState('');
    const [searchString, setSearchString] = useState('');
    const [limit, setLimit] = useState(20);

    const searchRef = createRef();


    const { data: totalBlogs } = useGetPublic(["totalBlogCategoryCount", category], `/categoryBlogCount?category=${category}`);

    const { data: blogs, isPending, refetch } = useGetPublic([category, "all-blog-posts"], `/blogByCategory?category=${category}&search=${searchString}&filter=${filter}&limit=${limit}`);

    useEffect(() => {
        refetch();
    }, [filter, searchString, limit]);

    return <div className='px-3  md:px-5'>
        <Nav />

        <div className="md:mt-10">
            <SectionTitle title={category} />
        </div>


        <div className="mt-5 md:hidden">
            <select defaultValue='' value={filter} onChange={(e) => setFilter(e.target.value)} className="select select-bordered w-full max-w-xs">
                <option disabled value=''>Filter by</option>
                <option value="all">All</option>
                <option value="popular">Most Popular</option>
                <option value="new">Recently Added</option>
            </select>
        </div>

        <div className="hidden md:flex justify-center mt-5">
            <div className="join">
                <div>
                    <div>
                        <input ref={searchRef} className="input input-bordered join-item" placeholder="Search" type="search" />
                    </div>
                </div>
                <select defaultValue='' value={filter} onChange={(e) => setFilter(e.target.value)} className="select select-bordered join-item">
                    <option disabled value=''>Filter by</option>
                    <option value="all">All</option>
                    <option value="popular">Most Popular</option>
                    <option value="new">Recently Added</option>
                </select>
                <div className="indicator">

                    <button onClick={() => setSearchString(searchRef.current.value)} className="btn join-item bg-green-600 text-white hover:text-black">Search</button>
                </div>
            </div>
        </div>



        <div >
            {
                isPending ? <NoDataLoader />
                    : <div>
                        {
                            blogs?.length > 0 ? <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-10">
                                {blogs?.map(blog => <BlogCard key={blog?._id} blog={blog} />)}
                            </div> : <div>
                                <h3 className="my-20 text-center text-gray-400 font-semibold text-3xl">No blog post found!</h3>
                            </div>

                        }
                    </div>
            }
        </div>


        <div className={`my-20  hidden text-center ${!(totalBlogs?.count <= blogs?.length || blogs?.length <= 20) ? "block" : "hidden"} `}>
            <button onClick={() => setLimit(limit + 20)} className="text-center bg-green-600 text-white btn hover:text-black font-semibold px-10 py-3">Show more</button>
        </div>



    </div>
}

export default BlogPosts