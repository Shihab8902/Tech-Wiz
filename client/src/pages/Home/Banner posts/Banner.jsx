import './banner.css'
import useBlogLatest from '../../../hooks/useBlogLatest'
import BannerCard from './BannerCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';



const Banner = () => {
    const { latestBlogs } = useBlogLatest();

    const banner1 = latestBlogs?.[0];
    const banner2 = latestBlogs?.[1];
    const banner3 = latestBlogs?.[2];


    return <div className=' lg:my-10  container mx-auto'>
        {
            latestBlogs ? <div className='h-[400px] md:h-[500px] w-full lg:grid grid-cols-3 grid-rows-2 gap-2' >

                <div className='h-full col-span-2 row-span-2 w-full mb-2'>
                    <BannerCard key={banner1._id} blog={banner1} />
                </div>
                <div className='h-full w-full mb-2'>
                    <BannerCard key={banner2._id} blog={banner2} />
                </div>
                <div className='h-full w-full mb-2'>
                    <BannerCard key={banner3._id} blog={banner3} />
                </div>

            </div>

                : ""
        }
    </div >


}

export default Banner