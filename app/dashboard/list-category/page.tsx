"use client";
import { useState } from "react";

type Categories = {
    id: number,
    name: string,
}

const CategoryPage = () => {
    const [categories, setCategories] = useState<Categories[]>([]); 
    const [inputModalOpen, setInputModalOpen] = useState(false);

    const showModal = ({ type, id }: { type: string, id?: number }) => {
        if (type == "input") {
            setInputModalOpen(true);
        } else if (type == "detail" && id !== undefined) {
            // setSelectedBarangId(id);
            // setDetailModalOpen(true);
        } else {
            console.log("Undefined Modal");
        }
    };

    
    return (
        <div className="text-[#F26B0F]">
            <h1 className="text-6xl mb-24">List Kategori</h1>
            <button onClick={() => showModal({ type: "input" })} type="button" className="bg-[#F26B0F] text-white float-right mb-3 px-12 py-2 rounded-md hover:bg-[#b75717] duration-150">
                Tambah
            </button>
        </div>
    )
}

export default CategoryPage;