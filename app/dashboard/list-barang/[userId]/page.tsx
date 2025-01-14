"use client";
import DetailModal from "@/app/components/list-barang/DetailModal";
import InputModal from "@/app/components/list-barang/InputModal";
import DataTable from "@/app/components/list-barang/Table";
import api from "@/config/api";
import { useCallback, useEffect, useState } from "react";

type Barang = {
    id: number,
    name: string,
    price: number,
    stock: number
}

type ListBarangPageProps = {
    params: { userId: string };
}

const ListBarangPage = ({ params }: ListBarangPageProps) => {
    const [barangs, setBarangs] = useState<Barang[]>([]);
    const [inputModalOpen, setInputModalOpen] = useState(false);
    const [detailModalOpen, setDetailModalOpen] = useState(false);
    const [selectedBarangId, setSelectedBarangId] = useState<number | undefined>(undefined);

    const showModal = ({ type, id }: { type: string, id?: number }) => {
        if (type == "input") {
            setInputModalOpen(true);
        } else if (type == "detail" && id !== undefined) {
            setSelectedBarangId(id);
            setDetailModalOpen(true);
        } else {
            console.log("Undefined Modal");
        }
    };

    const fetchBarang = useCallback(async () => {
        try {
            const res = await api.get(`barang/get-barang/${params.userId}`, {});

            if (res.success) {
                setBarangs(res.data);
            }
        } catch (error) {
            console.error("Error fetching barangs:", error);
        }
    }, [params.userId]);

    useEffect(() => {
        fetchBarang();
    }, [fetchBarang]);

    const handleDelete = async (id: number) => {
        try {
            const res = await api.delete(`barang/delete/${id}`, {});

            if (res.success) {
                fetchBarang();
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
            {detailModalOpen && (
                <DetailModal
                    key={selectedBarangId} // Memaksa unmount dan mount ulang saat `selectedBarangId` berubah
                    modalOpen={detailModalOpen}
                    closeModal={() => closeModal({ type: "detail" })}
                    barangId={selectedBarangId}
                />
            )}
            <InputModal modalOpen={inputModalOpen} closeModal={() => closeModal({ type: "input" })} onSuccess={fetchBarang} />
            <DataTable data={barangs} handleDelete={handleDelete} handleDetailModal={(id) => showModal({ type: "detail", id })} />
        </div>
    )
}

export default ListBarangPage;