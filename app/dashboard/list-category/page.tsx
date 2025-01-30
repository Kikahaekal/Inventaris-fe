"use client";
import { EditModal } from "@/app/components/list-category/EditModal";
import { InputModal } from "@/app/components/list-category/InputModal";
import DataTable from "@/app/components/list-category/Table";
import { useCategory } from "@/app/Context/CategoryContext";
import api from "@/config/api";
import { useState } from "react";

const CategoryPage = () => {
    const [inputModalOpen, setInputModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number| undefined>(undefined);

    const categoryContext = useCategory();

    if (!categoryContext) {
        throw new Error('useBarang harus dipakai didalam komponen BarangProvider');
    }

    const { category, refreshCategory } = categoryContext;

    const showModal = ({ type, id }: { type: string, id?: number }) => {
        if (type == "input") {
            setInputModalOpen(true);
        } else if (type == "edit" && id !== undefined) {
            setSelectedCategoryId(id);
            setEditModalOpen(true);
        } else {
            console.log("Undefined Modal");
        }
    };

    const closeModal = ({ type }: { type: string }) => {
        if (type == "input") {
            setInputModalOpen(false);
        } else if (type == "edit") {
            setEditModalOpen(false);
        } else {
            console.log("Undefined Modal");
        }
    }

    const handleDelete = async (id: number) => {
        try {
            const res = await api.delete(`categories/delete/${id}`, {});

            if(res.success) {
                refreshCategory();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="text-[#F26B0F]">
            <h1 className="text-6xl mb-24">List Kategori</h1>
            <button onClick={() => showModal({ type: "input" })} type="button" className="bg-[#F26B0F] text-white float-right mb-3 px-12 py-2 rounded-md hover:bg-[#b75717] duration-150">
                Tambah
            </button>
            <InputModal 
                modalOpen={inputModalOpen} 
                closeModal={() => closeModal({ type: "input" })} 
                getCategory={refreshCategory} 
            />
            <DataTable 
                data={category} 
                handleDelete={handleDelete} 
                handleEditModal={(id) => showModal({ type: "edit", id })} 
            />
            <EditModal 
                modalOpen={editModalOpen}
                getCategory={refreshCategory}
                closeModal={() => closeModal({type: "edit"})}
                categoryId={selectedCategoryId}
            />
        </div>
    )
}

export default CategoryPage;