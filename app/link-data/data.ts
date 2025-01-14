import homeIcon from "../../public/home.png";
import listIcon from "../../public/list.png";
import categoryIcon from "../../public/category.png";

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
    },
    {
        path: "/dashboard/list-category",
        icon: categoryIcon,
        text: "List Kategori"
    }
]

export default Data;