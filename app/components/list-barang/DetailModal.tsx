import api from "@/config/api";
import { Modal } from "antd";
import { useEffect, useState } from "react";

type BarangDetail = {
    id: number;
    name: string;
    price: number;
    stock: number;
};

type DetailModalProps = {
    modalOpen: boolean,
    closeModal: () => void,
    barangId?: number
}

const DetailModal = ({ modalOpen, closeModal, barangId }: DetailModalProps) => {
    const [detailBarang, setDetailBarang] = useState<BarangDetail | undefined>(undefined);
    const handleOk = () => closeModal();
    const handleCancel = () => closeModal();

    useEffect(() => {
        const getDetailBarang = async () => {
            if (!barangId) return;
            try {
                const res = await api.get(`barang/data-barang/${barangId}`, {});

                if (res.success) {
                    setDetailBarang(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        getDetailBarang();
    }, [barangId]);

    return (
        <Modal
            title="Detail Barang"
            open={modalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            {detailBarang ? (
                <div>
                    <p>Nama: {detailBarang.name}</p>
                    <p>Harga: {detailBarang.price}</p>
                    <p>Stok: {detailBarang.stock}</p>
                </div>
            ) : (
                <p>Memuat data barang...</p>
            )}
        </Modal>
    )

}

export default DetailModal;