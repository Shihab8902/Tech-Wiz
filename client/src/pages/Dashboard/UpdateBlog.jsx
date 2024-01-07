import { useLoaderData, useNavigate } from "react-router-dom"
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { Toaster, toast } from 'sonner';
import './compose.css'
import moment from 'moment/moment';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdateBlog = () => {


    const blog = useLoaderData().data;
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [editorValue, setEditorValue] = useState('');


    const [isUpdating, setIsUpdating] = useState(false);
    const [category, setCategory] = useState(blog?.category);
    const [image, setImage] = useState(blog?.image);
    const [modifiedImage, setModifiedImage] = useState('');


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

    const { quill, quillRef } = useQuill({ modules });




    useEffect(() => {
        quill?.clipboard.dangerouslyPasteHTML(blog?.body)
        if (quill) {
            quill.on('text-change', () => {
                setEditorValue(quillRef.current.firstChild.innerHTML);
            });
        }
    }, [quill]);


    // Render image on change
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setModifiedImage(file);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        setIsUpdating(true);


        if (editorValue.length < 1) {
            return toast.error("Content not found! ", {
                classNames: {
                    toast: "bg-red-500"
                }
            })
        }

        const imageHostingAPIKey = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;


        axiosPublic.post(`https://api.imgbb.com/1/upload?key=${imageHostingAPIKey}`, { image: modifiedImage }, {
            headers: {
                "content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                if (res.data?.success) {
                    const imageURL = res.data?.data.display_url;

                    const updatedBlog = {
                        title,
                        category,
                        image: imageURL,
                        body: editorValue
                    }


                    axiosSecure.put(`/blog?id=${blog?._id}`, updatedBlog)
                        .then(res => {
                            if (res.data?.modifiedCount > 0) {
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: "Blog updated successfully!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate("/dashboard/myBlogs");
                                setIsUpdating(false);

                            }
                        })
                }
            })

    }



    return (
        <div className="  px-5 py-10 bg-white shadow rounded-lg min-h-screen">
            <h3 className="text-center font-semibold text-xl uppercase">Compose a new Blog</h3>

            <form onSubmit={handleFormSubmit} className="mt-10 max-w-[870px] mx-auto">


                <div className="flex items-center flex-col lg:flex-row justify-between gap-6">

                    <div className="w-full" >
                        <div>
                            <label htmlFor="title" className=" font-semibold ">Title</label>
                            <input defaultValue={blog?.title} className="w-full border py-3 px-5 rounded-lg mt-1 outline-none font-bold placeholder:font-normal" type="text" name="title" id="title" placeholder="Enter title" required minLength={2} />
                        </div>
                    </div>

                    <div className="w-full">
                        <div>
                            <label htmlFor="title" className=" font-semibold ">Category</label>
                            <select onChange={(e) => setCategory(e.target.value)} value={category} className="w-full border py-3 cursor-pointer px-5 rounded-lg mt-1 outline-none font-bold" name="category" id="category" defaultValue="" required>
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



                <div className="w-full my-5">
                    <div ref={quillRef} />
                </div>


                <div className="flex items-center gap-3">
                    <img src={image} className="w-12 h-12  rounded-lg " alt="" />
                    <input type="file" onChange={handleImageChange} accept='image/*' className="file-input file-input-bordered w-full " required />
                </div>

                <button type='submit' disabled={isUpdating} className='w-full btn bg-green-600 text-white py-3 rounded-lg mt-5'> {isUpdating ? <span className='flex gap-1 items-center'>Updating.... <span className="loading loading-spinner loading-xs"></span></span> : "Update"} </button>


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
    )
}

export default UpdateBlog