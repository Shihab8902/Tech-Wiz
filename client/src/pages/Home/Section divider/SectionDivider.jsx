import BlogAside from "../../Blog view/BlogAside"
import RecentPosts from "../Recent posts/RecentPosts"


const SectionDivider = () => {
    return <div className="grid lg:grid-cols-3 gap-10 container mx-auto">

        <div className="lg:col-span-2">
            <RecentPosts />
        </div>

        <div>
            <BlogAside />
        </div>



    </div>
}

export default SectionDivider