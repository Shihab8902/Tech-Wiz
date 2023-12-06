import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


import { MdOutlineMail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa6";
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { useForm } from "react-hook-form";
import { Toaster, toast } from 'sonner';
import { useContext } from 'react';
import { UserContext } from '../../context/AuthProvider';
import Swal from 'sweetalert2';
import useSaveUserToDB from '../../hooks/useSaveUserToDB';


const SignIn = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const captchaValue = watch("captcha");
    const { signInUser, signInWithGoogle } = useContext(UserContext);
    const navigate = useNavigate();
    const { handleSaveUserToDB } = useSaveUserToDB();

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);




    const onSubmit = (data) => {
        //Validate the captcha
        if (validateCaptcha(captchaValue) === false) {
            return toast.error("Invalid captcha", {
                classNames: {
                    toast: "bg-red-500"
                }
            })
        }

        signInUser(data.email, data.password)
            .then(res => {
                if (res.user) {
                    reset();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Signed in successfully! ",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/")
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error"
                })
            })



    }


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(res => {
                if (res.user) {
                    const user = {
                        name: res.user?.displayName,
                        email: res.user?.email,
                        image: res.user?.photoURL,
                        role: "user",
                        registeredAt: new Date()
                    }
                    handleSaveUserToDB(user);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Signed in successfully! ",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate("/");

                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Error",
                    text: error.message,
                    icon: "error"
                })
            })
    }






    return <div className='p-3 md:p-6'>

        <div className='flex min-h-screen justify-center items-center container mx-auto'>


            <div className='rounded-lg md:p-10 md:border-2 w-full md:w-3/4 lg:w-1/2'>
                <form onSubmit={handleSubmit(onSubmit)} >

                    <div className='text-center mb-7'>
                        <Link to="/" className='font-bold text-3xl'>Tech<span className='text-[#36d636]'>Wiz</span></Link>
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
                        <div>
                            <LoadCanvasTemplate />
                        </div>
                        <input {...register("captcha")} className='w-full px-4 py-3 outline-none border-2 rounded-lg font-bold text-black placeholder:font-normal' type="text" name="captcha" id="captcha" placeholder='Enter captcha' />
                    </div>




                    <div>
                        <button type='submit' className='w-full bg-green-500 py-3 text-white font-semibold rounded-lg '>Sign In</button>
                    </div>

                    <p className='text-center mt-5 font-medium'>Don't have an account? <Link className='text-blue-500 hover:underline' to="/signup">Sign Up</Link></p>

                </form>

                <div className="flex w-full items-center mt-5">
                    <div className="grid h-[1px] flex-grow card bg-gray-500 rounded-box place-items-center"></div>
                    <div className="divider divider-horizontal font-semibold">or</div>
                    <div className="grid h-[1px] flex-grow card bg-gray-500 rounded-box place-items-center"></div>
                </div>


                <button onClick={handleGoogleSignIn} className='flex items-center border-2 px-5 py-3 mt-3 bg-gray-100 rounded-lg hover:bg-gray-200 gap-1 font-semibold mx-auto'><FcGoogle className='text-2xl' /> Continue with Google</button>



                <Toaster
                    toastOptions={{
                        style: {
                            background: 'red',
                            color: "white"
                        },
                        className: 'class',
                    }}
                />
            </div>


        </div>




    </div>
}

export default SignIn