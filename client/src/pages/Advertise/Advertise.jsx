import { useNavigate } from 'react-router-dom';
import image from '../../assets/images/construction.png';


const Advertise = () => {

    const navigate = useNavigate();


    return <div className="h-screen w-full">
        <img className=' w-72 mx-auto' src={image} alt="" />

        <div>
            <h3 className='text-center my-5 font-bold text-2xl'>The page is in under construction</h3>
            <div className='text-center'>
                <button onClick={() => navigate(-1)} className='px-10 py-3 bg-green-600 rounded font-semibold btn hover:text-black text-white'>Go back</button>
            </div>
        </div>
    </div>
}

export default Advertise