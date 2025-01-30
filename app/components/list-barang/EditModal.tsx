import { useCategory } from "@/app/Context/CategoryContext";
import api from "@/config/api";
import { Button, Form, Input, Modal, Select, SelectProps, Space } from "antd";
import { FormProps, useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";

type Category = {
    id: number,
    name: string
}

type EditModalProps = {
    modalOpen: boolean;
    userId: string;
    closeModal: () => void;
    getBarang: () => void;
    barangId: number | undefined;
};

type FieldType = {
    name: string;
    price: number;
    stock: number;
    categoryIds: number[];
};

export const EditModal = ({modalOpen, userId, closeModal, getBarang, barangId}: EditModalProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = useForm();
    
    const categoryContext = useCategory();
    
    if (!categoryContext) {
        throw new Error('useCategory harus dipakai didalam komponen CategoryProvider');
    }
    
    const {category} = categoryContext;
    
    const options: SelectProps["options"] = category.map((category) => ({
        label: category.name,
        value: category.id
    }))

    useEffect(() => {
        const getDetailBarang = async () => {
            if (!barangId) return;
            try {
                const res = await api.get(`barang/data-barang/${barangId}`, {});

                if (res.success) {
                    form.setFieldsValue({
                        name: res.data.name,
                        price: res.data.price,
                        stock: res.data.stock,
                        categoryIds: res.data.categoryIds?.map((category: Category) => category.id || [])
                    })
                }
            } catch (error) {
                console.error(error);
            }
        }

        getDetailBarang();
    }, [barangId, form]);

    const handleOk: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            console.log(values);
            setConfirmLoading(true);

            const data = {
                ...values,
                userId: Number(userId),
                price: Number(values.price),
                stock: Number(values.stock),
                categoryIds: values.categoryIds
            }

            const res = await api.put(`barang/edit/${barangId}`, data);

            if(res.success) {
                getBarang();
                setTimeout(() => {
                    closeModal();
                    setConfirmLoading(false);
                }, 1000);
            } else {
                setConfirmLoading(false);
            }
        } catch (errorInfo) {
            console.log("Failed:", errorInfo);
        }
    };

    return (
        <Modal
            title="Edit Form"
            open={modalOpen}
            onOk={() => form.submit()}
            confirmLoading={confirmLoading}
            onCancel={closeModal}
            footer={[
                <Button
                    form="myForm"
                    key="submit"
                    htmlType="submit"
                    loading={confirmLoading}
                >
                    Submit
                </Button>,
            ]}
        >
            <Form
                id="myForm"
                form={form}
                onFinish={handleOk}
                autoComplete="off"
                layout="vertical"
            >
                <Form.Item
                    name="name"
                    label="Nama"
                    rules={[{ required: true, message: "Please input the name!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Harga"
                    rules={[{ required: true, message: "Please input the price!" }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="stock"
                    label="Stok"
                    rules={[{ required: true, message: "Please input the stock!" }]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item
                    name="categoryIds"
                    label="Kategori"
                    rules={[{ required: true, message: "Please select at least one category!" }]}
                >
                    <Space style={{ width: '100%' }} direction="vertical">
                        <Select
                        mode="multiple"
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Please select"
                        options={options}
                        onChange={(ids) => form.setFieldsValue({ categoryIds: ids })}
                        />
                    </Space>
                </Form.Item>
            </Form>
        </Modal>
    );
}