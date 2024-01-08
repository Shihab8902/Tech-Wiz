
import Footer from '../../shared/Footer/Footer';
import Nav from '../../shared/Nav/Nav'
import SubNav from '../../shared/Nav/SubNav'
import Banner from './Banner/Banner'
import SectionDivider from './Section divider/SectionDivider'

import Helmet from 'react-helmet';






const Home = () => {






    return <>

        <Helmet>
            <title>TechWiz | Home</title>
        </Helmet>


        <div className='px-3  md:px-5'>
            <Nav />
            <SubNav />
            <Banner />
            <SectionDivider />

        </div>

        <Footer />



    </>





}

export default Home