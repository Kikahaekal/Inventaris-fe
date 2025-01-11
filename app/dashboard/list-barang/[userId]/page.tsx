"use client";
import DataTable from "@/app/components/list-barang/Table";
import api from "@/config/api";
import { useEffect, useState } from "react";

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

    useEffect(() => {
        const listBarang = async () => {
            try {
                const res = await api.get(`barang/get-barang/${params.userId}`, {});
                if (res.success) {
                    setBarangs(res.data);
                }
            } catch (error) {
                console.error("Error fetching barangs:", error);
            }
        };

        listBarang();
    }, [params.userId]);

    return (
        <div className="text-[#F26B0F]">
            <h1 className="text-6xl mb-24">List Barang</h1>
            <DataTable data={barangs} />
        </div>
    )
}

export default ListBarangPage;