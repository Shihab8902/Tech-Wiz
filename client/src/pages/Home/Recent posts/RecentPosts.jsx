import NoDataLoader from '../../../components/Loader/NoDataLoader';
import SectionTitle from '../../../components/Section title/SectionTitle'
import useGetPublic from '../../../hooks/useGetPublic'
import RecentPostCard from './RecentPostCard';

const RecentPosts = () => {

    const { data: recentBlogs = [] } = useGetPublic(["recent-blogs"], "/blogs/recent");




    return <div >
        <SectionTitle title="Recent posts" />


        {
            recentBlogs.length > 0 ? <div className='my-10 grid lg:grid-cols-2 gap-y-12 gap-x-6'>
                {recentBlogs?.map(blog => <RecentPostCard key={blog._id} blog={blog} />)}
            </div> : <NoDataLoader />
        }













    </div>
}

export default RecentPosts