"use client";
import InputModal from "@/app/components/list-barang/InputModal";
import DataTable from "@/app/components/list-barang/Table";
import api from "@/config/api";
import { useCallback, useEffect, useState } from "react";

type Barang = {
    name: string,
    price: number,
    stock: number
}

type ListBarangPageProps = {
    params: { userId: string };
}

const ListBarangPage = ({ params }: ListBarangPageProps) => {
    const [barangs, setBarangs] = useState<Barang[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
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

    const closeModal = () => {
        setModalOpen(false);
        fetchBarang();
    }

    return (
        <div className="text-[#F26B0F]">
            <h1 className="text-6xl mb-24">List Barang</h1>
            <button onClick={showModal} type="button" className="bg-[#F26B0F] text-white float-right mb-3 px-12 py-2 rounded-md hover:bg-[#b75717] duration-150">
                Tambah
            </button>
            <InputModal modalOpen={modalOpen} closeModal={closeModal} onSuccess={fetchBarang}/>
            <DataTable data={barangs} />
        </div>
    )
}

export default ListBarangPage;