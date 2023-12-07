import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./compose.css"

const Compose = () => {

    const [value, setValue] = useState('');

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['blockquote', 'code-block'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean'],

        ],
    };


    const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', 'list', 'link',]


    return <div className="  p-5 bg-white shadow rounded-lg">
        <h3 className="text-center font-semibold text-xl uppercase">Compose a new Blog</h3>

        <form className="mt-10">


            <div className="flex items-center flex-col lg:flex-row justify-between gap-6">

                <div className="w-full" >
                    <div>
                        <label htmlFor="title" className=" font-semibold ">Title</label>
                        <input className="w-full border-2 py-3 px-5 rounded-lg mt-1 outline-none font-bold placeholder:font-normal" type="text" name="title" id="title" placeholder="Enter title" required minLength={2} />
                    </div>
                </div>

                <div className="w-full">
                    <div>
                        <label htmlFor="title" className=" font-semibold ">Category</label>
                        <select className="w-full border-2 py-3 cursor-pointer px-5 rounded-lg mt-1 outline-none font-bold" name="category" id="category" defaultValue="" required>
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


            <div className='mt-5  '>
                <ReactQuill
                    modules={modules}
                    className='max-w-[870px] mx-auto'
                    placeholder='Start writing...'
                    value={value} onChange={setValue}
                    formats={formats}
                />
            </div>





        </form>
    </div>
}

export default Compose