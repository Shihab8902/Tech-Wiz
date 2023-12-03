import { Link } from 'react-router-dom';
import { useState } from 'react';

import { FiUser } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";

import { useForm } from "react-hook-form";


const SignUp = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();



    const onSubmit = (data) => console.log(data)





    return <div className='p-3 md:p-6'>


        <div className='flex min-h-screen justify-center items-center container mx-auto'>
            <form onSubmit={handleSubmit(onSubmit)} className='rounded-lg md:p-10 md:border-2 w-full md:w-3/4 lg:w-1/2'>

                <div className='text-center mb-7'>
                    <Link to="/" className='font-bold text-3xl'>Tech<span className='text-[#36d636]'>Wiz</span></Link>
                </div>

                <div>
                    <label className='font-bold block mb-2' htmlFor="name">Name</label>
                    <div className='flex items-center border-2 rounded-lg'>
                        <span className='ml-3 text-xl text-gray-400'><FiUser /></span>
                        <input {...register("name", { required: true })} className='w-full px-4 py-3 outline-none rounded-tr-lg rounded-br-lg font-bold text-black placeholder:font-normal' type="text" name="name" id="name" placeholder='Enter your name' />
                    </div>
                    {errors.name?.type === "required" && <p className='text-red-500 text-sm font-medium'>This field is required</p>}
                </div>


                <div className='my-5'>
                    <label className='font-bold block mb-2' htmlFor="name">Email</label>
                    <div className='flex items-center border-2 rounded-lg'>
                        <span className='ml-3 text-xl text-gray-400'><MdOutlineMail /></span>
                        <input {...register("email", { required: true })} className='w-full px-4 py-3 outline-none rounded-tr-lg rounded-br-lg font-bold text-black placeholder:font-normal' type="email" name="email" id="email" placeholder='Enter your email' />
                    </div>
                    {errors.email?.type === "required" && <p className='text-red-500 text-sm font-medium'>This field is required</p>}
                </div>

                <div className='my-5'>
                    <label className='font-bold block mb-2' htmlFor="name">Password</label>
                    <div className='flex items-center border-2 rounded-lg'>
                        <span className='ml-3 text-xl text-gray-400'><IoIosLock /></span>
                        <input {...register("password", { required: true, minLength: 6 })} className='w-full px-4 py-3 outline-none rounded-tr-lg rounded-br-lg font-bold text-black placeholder:font-normal' type={isPasswordVisible ? "text" : "password"} name="password" id="password" placeholder='Enter your email' />
                        <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='text-xl text-gray-400 cursor-pointer mr-3'>
                            {
                                isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />
                            }
                        </span>
                    </div>
                    {errors.password?.type === "required" && <p className='text-red-500 text-sm font-medium'>This field is required</p>}
                    {errors.password?.type === "minLength" && <p className='text-red-500 text-sm font-medium'>Password should be at least 6 character</p>}
                </div>


                <div className='my-5'>
                    <label className='font-bold block mb-2' htmlFor="name">Photo</label>
                    <div className=' border-2 rounded-lg '>
                        <input {...register("image")} accept='image/*' className='w-full px-4 py-3' type="file" name="image" id="image" />
                    </div>
                </div>


                <div>
                    <button type='submit' className='w-full bg-green-500 py-3 text-white font-semibold rounded-lg '>Sign Up</button>
                </div>

                <p className='text-center mt-5 font-medium'>Already have an account? <Link className='text-blue-500 hover:underline' to="/signin">Sign In</Link></p>

            </form>


        </div>


    </div>
}

export default SignUp