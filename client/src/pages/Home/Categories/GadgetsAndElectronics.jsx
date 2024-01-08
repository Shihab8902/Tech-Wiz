import useGetPublic from "../../../hooks/useGetPublic";
import NoDataLoader from "../../../components/Loader/NoDataLoader";
import BlogCard from "../../../components/Blog card/BlogCard";
import CommonSectionTitle from "../../../components/Section title/CommonSectionTitle";



const GadgetsAndElectronics = () => {
    const { data: blogs, isPending } = useGetPublic(["gadgets-and-electronics"], `/blogByCategory?category=gadgets and electronics&limit=3`);

    return <div>

        <CommonSectionTitle title="Gadgets and Electronics" category="gadgets and electronics" />


        <div>
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

export default GadgetsAndElectronics