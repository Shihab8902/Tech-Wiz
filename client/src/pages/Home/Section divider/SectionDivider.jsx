import RecentPosts from "../Recent posts/RecentPosts"


const SectionDivider = () => {
    return <div className="grid lg:grid-cols-3 gap-6 container mx-auto">

        <div className="lg:col-span-2">
            <RecentPosts />
        </div>

        <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur, animi! Labore, ex cumque libero iste corrupti optio eaque ab perferendis minima quisquam quidem, exercitationem rerum. Debitis alias veniam minima explicabo?
        </div>



    </div>
}

export default SectionDivider