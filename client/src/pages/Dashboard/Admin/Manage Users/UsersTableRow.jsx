import { FaRegTrashAlt } from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";




const UsersTableRow = ({ user, refetch, sl }) => {



    const { image, name, email, role } = user;



    return <tr>

        <td className="font-semibold">{sl}</td>
        <td>
            <img src={image || "https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp"} className="w-10 h-10 rounded-lg" alt="" />
        </td>
        <td>
            <p className="text-xs font-semibold">{name}</p>
        </td>
        <td>
            <p className="text-xs font-semibold">{email}</p>
        </td>
        <td>
            <p className="text-xs font-semibold text-primary">{role}</p>
        </td>
        <td className="text-center">
            <button className="text-2xl text-green-600"><MdManageAccounts /></button>
        </td>
        <td className="text-center">
            <button className="text-xl text-red-600"><FaRegTrashAlt /></button>
        </td>

    </tr>
}

export default UsersTableRow