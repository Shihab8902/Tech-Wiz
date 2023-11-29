import bg from '../../assets/images/loading.gif';

const NoDataLoader = () => {
    return (
        <div className='flex my-20 justify-center'>
            <img className='w-[100px] h-[100px] mx-auto' src={bg} alt="" />
        </div>
    )
}

export default NoDataLoader