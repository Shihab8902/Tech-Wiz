import BlogCard from "../../../components/Blog card/BlogCard";
import NoDataLoader from "../../../components/Loader/NoDataLoader";
import CommonSectionTitle from "../../../components/Section title/CommonSectionTitle";
import useGetPublic from "../../../hooks/useGetPublic";


const ProgrammingAndDevelopment = () => {

    const { data: blogs, isPending } = useGetPublic(["programming-and-development"], `/blogByCategory?category=programming and development&limit=3`);


    return <div className="mt-10" id="programming-and-development">
        <CommonSectionTitle title="Programming and Development" category="programming and development" />

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

export default ProgrammingAndDevelopment