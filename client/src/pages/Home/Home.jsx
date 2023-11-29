

import Nav from '../../shared/Nav/Nav'
import SubNav from '../../shared/Nav/SubNav'
import Banner from './Banner/Banner'
import RecentPosts from './Recent posts/RecentPosts'





const Home = () => {
    return <>


        <div className='px-2  md:px-5'>
            <Nav />
            <SubNav />
            <Banner />
            <RecentPosts />

        </div>



    </>





}

export default Home