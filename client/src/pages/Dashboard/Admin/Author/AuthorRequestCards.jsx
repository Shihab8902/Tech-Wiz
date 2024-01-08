import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";



const AuthorRequestCards = ({ request, refetch }) => {

    const axiosSecure = useAxiosSecure();

    const handleAuthorPromote = (email, id) => {
        Swal.fire({
            title: "Author?",
            text: `Are you sure want to make ${email} an author?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.put(`/promoteUser?email=${email}&role=author`)
                    .then(res => {
                        if (res?.data?.modifiedCount > 0) {
                            axiosSecure.delete(`/deleteAuthUser?id=${id}`)
                                .then(res => {
                                    if (res?.data?.deletedCount > 0) {
                                        Swal.fire({
                                            position: "center",
                                            icon: "success",
                                            text: `${email} is now an author!`,
                                            showConfirmButton: false,
                                            timer: 1500
                                        });
                                        refetch();
                                    }
                                })


                        }
                    })
            }
        });
    }

    const handleAuthorDelete = (id) => {
        Swal.fire({
            title: "Cancel?",
            text: `Are you sure want to cancel the request?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        })
            .then(res => {
                if (res.isConfirmed) {
                    axiosSecure.delete(`/deleteAuthUser?id=${id}`)
                        .then(res => {
                            if (res?.data?.deletedCount > 0) {
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    text: `The request have been cancelled!`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                refetch();
                            }
                        })
                }
            })
    }




    const { photo, email, _id } = request;

    return <div className='flex items-center gap-2 p-5 border shadow-gray-400 shadow-2xl rounded-lg '>
        <img className='w-8 h-8 rounded-md ' src={photo || "https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp"} alt="user" />
        <h3 className=' font-semibold text-sm'>{email}</h3>

        <div className='flex items-center gap-2 justify-end w-full'>
            <button onClick={() => handleAuthorPromote(email, _id)}>✅</button>
            <button onClick={() => handleAuthorDelete(_id)}>❌</button>
        </div>
    </div>

}

export default AuthorRequestCards