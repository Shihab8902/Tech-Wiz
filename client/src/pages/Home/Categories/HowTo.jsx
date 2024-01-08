import BlogCard from "../../../components/Blog card/BlogCard";
import NoDataLoader from "../../../components/Loader/NoDataLoader";
import CommonSectionTitle from "../../../components/Section title/CommonSectionTitle";
import useGetPublic from "../../../hooks/useGetPublic";

const HowTo = () => {

    const { data: blogs, isPending } = useGetPublic(["how-to"], `/blogByCategory?category=how to&limit=3`);


    return <div className="mt-10">
        <CommonSectionTitle title="How to?" category="how to" />

        <div >
            {
                isPending ? <NoDataLoader />
                    : <div className="grid lg:grid-cols-3 gap-6 mt-10">
                        {
                            blogs?.length > 0 ? blogs.map(blog => <BlogCard key={blog?._id} blog={blog} />) : ""

                        }
                    </div>
            }
        </div>


    </div>


}

export default HowTo