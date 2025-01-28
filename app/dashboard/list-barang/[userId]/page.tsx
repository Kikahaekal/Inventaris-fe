"use client";
import DetailModal from "@/app/components/list-barang/DetailModal";
import { EditModal } from "@/app/components/list-barang/EditModal";
import InputModal from "@/app/components/list-barang/InputModal";
import DataTable from "@/app/components/list-barang/Table";
import { useBarang } from "@/app/Context/BarangContext";
import { CategoryProvider } from "@/app/Context/CategoryContext";
import api from "@/config/api";
import { useState } from "react";

type ListBarangPageProps = {
    params: { userId: string };
}

const ListBarangPage = ({ params }: ListBarangPageProps) => {
    const [inputModalOpen, setInputModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedBarangId, setSelectedBarangId] = useState<number | undefined>(undefined);

    const barangContext = useBarang();

    if (!barangContext) {
        throw new Error('useBarang harus dipakai didalam komponen BarangProvider');
    }

    const { barang, refreshBarang } = barangContext;

    const showModal = ({ type, id }: { type: string, id?: number }) => {
        if (type == "input") {
            setInputModalOpen(true);
        } else if (type == "detail" && id !== undefined) {
            setSelectedBarangId(id);
            setDetailModalOpen(true);
        } else if (type == "edit" && id !== undefined) {
            setSelectedBarangId(id);
            setEditModalOpen(true);
        } else {
            console.log("Undefined Modal");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            const res = await api.delete(`barang/delete/${id}`, {});

            if (res.success) {
                refreshBarang();
            }
        } catch (error) {
            console.error("Error fetching barangs:", error);
        }
    }

    const closeModal = ({ type }: { type: string }) => {
        if (type == "input") {
            setInputModalOpen(false);
        } else if (type == "detail") {
            setDetailModalOpen(false);
        } else if (type == "edit") {
            setEditModalOpen(false);
        } else {
            console.log("Undefined Modal");
        }
    }

    return (
        <div className="text-[#F26B0F]">
            <h1 className="text-6xl mb-24">List Barang</h1>
            <button onClick={() => showModal({ type: "input" })} type="button" className="bg-[#F26B0F] text-white float-right mb-3 px-12 py-2 rounded-md hover:bg-[#b75717] duration-150">
                Tambah
            </button>
            <DetailModal
                key={selectedBarangId} // Memaksa unmount dan mount ulang saat `selectedBarangId` berubah
                modalOpen={detailModalOpen}
                closeModal={() => closeModal({ type: "detail" })}
                barangId={selectedBarangId}
            />
            <CategoryProvider>
                <EditModal 
                    modalOpen={editModalOpen}
                    closeModal={() => closeModal({type: "edit"})}
                    getBarang={refreshBarang}
                    userId={params.userId}
                    barangId={selectedBarangId}
                />
                <InputModal
                    modalOpen={inputModalOpen}
                    closeModal={() => closeModal({ type: "input" })}
                    getBarang={refreshBarang}
                    userId={params.userId}
                />
            </CategoryProvider>
            <DataTable 
                data={barang} 
                handleDelete={handleDelete} 
                handleDetailModal={(id) => showModal({ type: "detail", id })} 
                handleEditModal={(id) => showModal({ type: "edit", id })} 
            />
        </div>
    )
}

export default ListBarangPage;