import homeIcon from "../../public/home.png";
import listIcon from "../../public/list.png";

const Data = [
    {
        path: "/dashboard",
        icon: homeIcon,
        text: "Dashboad"
    },
    {
        path: `/dashboard/list-barang/${localStorage.getItem('userId')}`,
        icon: listIcon,
        text: "List Barang"
    }
]

export default Data;