import { useContext, useState } from "react";
import { UserContext } from "../../context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";


const UserProfile = () => {

    const { user } = useContext(UserContext);



    const [image, setImage] = useState(user?.photoURL);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [modifiedImage, setModifiedImage] = useState(user?.photoURL);
    const [modifiedName, setModifiedName] = useState(user?.displayName);
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();



    // Render image on change
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setModifiedImage(file);
        setIsChanged(true);
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



    // Handle image update change
    const handleProfileUpdate = () => {
        setIsUpdating(true);
        const imageHostingAPIKey = import.meta.env.VITE_IMAGE_HOSTING_API_KEY;
        axiosPublic.post(`https://api.imgbb.com/1/upload?key=${imageHostingAPIKey}`, { image: modifiedImage }, {
            headers: {
                "content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                if (res.data?.success) {
                    const imageURL = res.data?.data.display_url;
                    axiosSecure.put(`/updateUser?email=${user?.email}`, { name: modifiedName, image: imageURL })
                        .then(res => {
                            if (res.data?.modifiedCount > 0) {
                                updateProfile(user, {
                                    displayName: modifiedName,
                                    photoURL: imageURL
                                })
                                    .then(() => {
                                        Swal.fire({
                                            position: "center",
                                            icon: "success",
                                            text: "Your profile has been updated successfully!",
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        setImage(imageURL);
                                        setIsChanged(false);
                                        setIsUpdating(false);
                                    })
                            }
                        })
                }

            });
    }




    return <>


        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full border-2 ">
                    {
                        isUpdating ? <img alt="User" src="https://i.ibb.co/tm2yWnf/updating.gif" /> :
                            <img alt="User" src={user?.photoURL || "https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp"} />
                    }
                </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <p className='text-center font-bold my-4'>{user?.displayName || "User"}</p>
                <button onClick={() => document.getElementById('my_modal_3').showModal()} className=" font-semibold bg-blue-600 py-2 mb-4 text-white rounded-full">Edit Profile</button>
            </ul>
        </div>




        {/* Profile update modal */}
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div >
                    <div className="relative overflow-hidden w-[80px] h-[80px] rounded-full mx-auto">
                        <img src={image || 'https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp'} alt="User" className="w-full h-full rounded-full " />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                    </div>

                    <input type="text" onChange={(e) => {
                        setIsChanged(true);
                        setModifiedName(e.target.value)
                    }} className="w-full font-bold outline-none px-5 py-3 mt-5 text-center rounded-lg " defaultValue={user?.displayName} minLength={2} />

                    <form method="dialog">
                        <button disabled={!isChanged} onClick={handleProfileUpdate} className="bg-green-600 hover:text-black btn w-full py-3 rounded-lg mt-5 text-white">Update Profile</button>
                    </form>
                </div>
            </div>
        </dialog>














    </>
}

export default UserProfile