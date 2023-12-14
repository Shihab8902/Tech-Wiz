import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./compose.css"
import { useContext } from 'react';
import { UserContext } from '../../context/AuthProvider';
import { Toaster, toast } from 'sonner';
import moment from 'moment/moment';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Compose = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [body, setBody] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');

    //Editor toolbar
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['blockquote', 'code-block'],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean'],
        ],
    };

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();



    const handleFormSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;


        if (body.length < 1) {
            return toast.error("Content not found! ", {
                classNames: {
                    toast: "bg-red-500"
                }
            })
        }

        const imageHostingAPIKey = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;


        axiosPublic.post(`https://api.imgbb.com/1/upload?key=${imageHostingAPIKey}`, { image: image }, {
            headers: {
                "content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                if (res.data?.success) {
                    const imageURL = res.data?.data.display_url;

                    const blog = {
                        title,
                        category,
                        image: imageURL,
                        body,
                        comments: [],
                        totalViews: 0,
                        publisher: user?.displayName,
                        publisher_email: user?.email,
                        publish_date: moment().format('YYYY-MM-DD')
                    }

                    axiosSecure.post("/blogs", blog)
                        .then(res => {
                            if (res.data?.acknowledged) {
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "New blog successfully published!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate("/")
                            }
                        })
                }
            })

    }




    return <div className="  px-5 py-10 bg-white shadow rounded-lg min-h-screen">
        <h3 className="text-center font-semibold text-xl uppercase">Compose a new Blog</h3>

        <form onSubmit={handleFormSubmit} className="mt-10 max-w-[870px] mx-auto">


            <div className="flex items-center flex-col lg:flex-row justify-between gap-6">

                <div className="w-full" >
                    <div>
                        <label htmlFor="title" className=" font-semibold ">Title</label>
                        <input className="w-full border py-3 px-5 rounded-lg mt-1 outline-none font-bold placeholder:font-normal" type="text" name="title" id="title" placeholder="Enter title" required minLength={2} />
                    </div>
                </div>

                <div className="w-full">
                    <div>
                        <label htmlFor="title" className=" font-semibold ">Category</label>
                        <select onChange={(e) => setCategory(e.target.value)} className="w-full border py-3 cursor-pointer px-5 rounded-lg mt-1 outline-none font-bold" name="category" id="category" defaultValue="" required>
                            <option value="" disabled>Select a Category</option>
                            <option value="gadgets and electronics">Gadgets and Electronics</option>
                            <option value="software and apps">Software and Apps</option>
                            <option value="how to">How to?</option>
                            <option value="tech news">Tech News</option>
                            <option value="programming and development">Programming and Development</option>
                            <option value="gaming and entertainment">Gaming and Entertainment</option>
                        </select>
                    </div>
                </div>

            </div>



            <ReactQuill modules={modules} className='w-full my-5 ' placeholder='Start writing....' theme="snow" value={body} onChange={setBody} />


            <input type="file" onChange={(e) => setImage(e.target?.files[0])} accept='image/*' className="file-input file-input-bordered w-full " required />

            <button type='submit' className='w-full bg-green-600 text-white py-3 rounded-lg mt-5'>Publish</button>


        </form >



        <Toaster
            toastOptions={{
                style: {
                    background: 'red',
                    color: "white"
                },
                className: 'class',
            }}
        />
    </div >
}

export default Compose