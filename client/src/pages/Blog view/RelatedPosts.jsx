import { useEffect } from "react";
import SectionTitle from "../../components/Section title/SectionTitle"
import useGetPublic from "../../hooks/useGetPublic"
import { useState } from "react";
import BlogCard from "../../components/Blog card/BlogCard";

const RelatedPosts = ({ blog }) => {

    const { data } = useGetPublic(["relatedBlogs"], `/relatedBlogs?category=${blog.category}`);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const filteredBlogs = data?.filter(relatedBlog => relatedBlog._id !== blog._id);
        setBlogs(filteredBlogs);
    }, [data]);


    return <>
        {
            blogs?.length > 0 && <div className="mt-14">

                <SectionTitle title="Related Posts" />

                <div className="grid lg:grid-cols-3 gap-6 mt-5">
                    {
                        blogs?.map(blog => <BlogCard key={blog._id} blog={blog} />)
                    }
                </div>







            </div>
        }





    </>



}

export default RelatedPosts