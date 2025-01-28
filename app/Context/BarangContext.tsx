import api from "@/config/api";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Barang = {
    id: number,
    name: string,
    price: number,
    stock: number
}

type BarangContextType = {
    barang: Barang[];
    refreshBarang: () => void;
    userId: string | null;
}

const BarangContext = createContext<BarangContextType | undefined>(undefined);

export const BarangProvider = ({children}: {children: React.ReactNode}) => {
    const [barang, setBarang] = useState<Barang[]>([]);
    const pathname = usePathname();

    const userId = pathname.split("/")[3] || null;

    const fetchBarang = useCallback(async () => {
        if(!userId) return;

        try {
            const res = await api.get(`barang/get-barang/${userId}`, {});

            if(res.success) setBarang(res.data);
        } catch (error) {
            console.error(error);
        }
    }, [userId])

    useEffect(() => {
        fetchBarang();
    }, [fetchBarang])

    return (
        <BarangContext.Provider value={{ barang, refreshBarang: fetchBarang, userId }}>
            {children}
        </BarangContext.Provider>
    )
}

export const useBarang = () => useContext(BarangContext);