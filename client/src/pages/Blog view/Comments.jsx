import { useContext, useRef, useState } from "react";
import SectionTitle from "../../components/Section title/SectionTitle"
import { UserContext } from "../../context/AuthProvider";
import { Link } from 'react-router-dom'
import moment from 'moment/moment';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Comments = ({ blog }) => {
    const { user } = useContext(UserContext);
    const axiosSecure = useAxiosSecure();
    const [updatedComment, setUpdatedComment] = useState('');


    const handleCommentSubmit = e => {
        e.preventDefault();
        const comment = e.target.comment.value;

        if (!user) {
            document.getElementById('my_modal_2').showModal()
        }

        const commentData = {
            name: user?.displayName,
            email: user?.email,
            comment,
            commentId: uuidv4(),
            image: user?.photoURL,
            commentedAt: moment().format('YYYY-MM-DD')
        }

        const comments = [...blog?.comments, commentData];

        //Update the comment
        axiosSecure.put(`/updateComments?id=${blog?._id}`, comments)
            .then(res => {
                if (res.data?.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        text: "Thanks for sharing your thoughts! Your comment has been posted.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    window.location.reload();
                    e.target.reset();
                }
            })


    }


    const handleCommentDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure want to delete this comment permanently?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "red",
            cancelButtonColor: "green",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const newComments = blog?.comments.filter(comment => comment.commentId !== id);

                //update the blog with new comment
                axiosSecure.put(`/updateComments?id=${blog?._id}`, newComments)
                    .then(res => {
                        if (res.data?.modifiedCount > 0) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                text: "Comment deleted successfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            window.location.reload();
                        }
                    })
            }
        });



    }

    const handleCommentEdit = (id) => {
        const selectedComment = blog?.comments.find(selectedBlog => selectedBlog.commentId === id);
        if (!updatedComment) {
            window.location.reload();
            return;
        }
        selectedComment.comment = updatedComment;
        //update the blog with new comment
        axiosSecure.put(`/updateComments?id=${blog?._id}`, blog?.comments)
            .then(res => {
                if (res.data?.modifiedCount > 0) {
                    window.location.reload();
                }
            })
    }




    return <div className="mt-14">
        <SectionTitle title={blog.comments?.length > 0 ? `${blog.comments?.length} Comments` : `Comments`} />

        <dialog id="my_modal_2" className="modal">
            <div className="modal-box py-10">
                <p className="mb-10 font-semibold">Please Sign in to leave a comment!</p>
                <Link className="border-2 border-black px-8 font-medium hover:bg-green-600 hover:border-none hover:text-white py-2 rounded-full" to="/signin">Sign in</Link>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>




        <div className="mt-5">

            <form onSubmit={handleCommentSubmit}>
                <textarea name="comment" id="comment" className="w-full border-2 h-32 outline-none resize-none p-3" placeholder="Leave a comment " required></textarea>
                <button type="submit" className="px-8 bg-green-600 text-white py-2 mt-3 font-semibold">Submit </button>
            </form>

            <div className="mt-10">
                {
                    blog?.comments?.length > 0 ? <div>


                        {
                            blog?.comments?.map(singleComment => {

                                const { commentId, image, name, commentedAt, comment, email } = singleComment;



                                return <div key={commentId} className="mb-10 w-full">

                                    {/* Modal for update comment */}
                                    <dialog id="my_modal_3" className="modal">
                                        <div className="modal-box py-10">
                                            <textarea onChange={(e) => setUpdatedComment(e.target.value)} name="updatedComment" defaultValue={comment} className="w-full h-48 border-2 outline-none p-3"></textarea>
                                            <button onClick={() => handleCommentEdit(commentId)} className=" w-full bg-green-600 py-3 mt-5 text-white font-semibold "> Update</button>
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog>

                                    {/* Render comments */}
                                    <div className="flex gap-4 ">
                                        <img className=" w-14 h-14 rounded-full" src={image || "https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp"} alt="" />
                                        <div className="flex items-center gap-2 md:gap-4">
                                            <p className="font-bold md:text-lg ">{name}</p> <span className="text-xs font-medium text-gray-500">{commentedAt}</span>
                                            {
                                                user?.email === email && <div className="flex items-center gap-2">
                                                    <button onClick={() => document.getElementById('my_modal_3').showModal()} className="text-xs"><FaEdit /></button>
                                                    <button onClick={() => handleCommentDelete(commentId)} className="text-sm text-red-600"><MdDelete /></button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <p className="md:ml-20 text-gray-600">{comment}</p>
                                </div>
                            })
                        }

                    </div>
                        :
                        <p className="text-center mt-10 text-lg font-semibold text-gray-500">No comments yet. Be the first to share your thoughts!</p>
                }
            </div>

        </div>
    </div>
}

export default Comments