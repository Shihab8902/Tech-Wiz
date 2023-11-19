import React from 'react'
import Nav from '../../shared/Nav/Nav'
import SubNav from '../../shared/Nav/SubNav'
import Banner from './Banner posts/Banner'


const Home = () => {
    return <section >

        <div className='px-2 md:px-5'>
            <Nav />
            <SubNav />
            <Banner />
        </div>


    </section>
}

export default Home