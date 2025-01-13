import homeIcon from "../../public/home.png";
import listIcon from "../../public/list.png";

const Data = [
    {
        path: "/dashboard",
        icon: homeIcon,
        text: "Dashboad"
    },
    {
        pathWithId: `/dashboard/list-barang/:userId`,
        icon: listIcon,
        text: "List Barang"
    }
]

export default Data;