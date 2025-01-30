import { useCategory } from "@/app/Context/CategoryContext";
import { Button, Form, Input, Modal, Select, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import type { FormProps, SelectProps } from 'antd';
import api from "@/config/api";

type InputModalProps = {
    modalOpen: boolean;
    userId: string;
    closeModal: () => void;
    getBarang: () => void;
};

type FieldType = {
    name: string;
    price: number;
    stock: number;
    categoryIds: number[];
};

const InputModal = ({ modalOpen, closeModal, getBarang, userId }: InputModalProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = useForm();

    const categoryContext = useCategory();

    if (!categoryContext) {
        throw new Error('useCategory harus dipakai didalam komponen CategoryProvider');
    }

    const { category } = categoryContext;

    const options: SelectProps["options"] = category.map((category) => ({
        label: category.name,
        value: category.id
    }));

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

            const res = await api.post("barang/create", data);

            if(res.success) {
                getBarang();
                setTimeout(() => {
                    closeModal();
                    setConfirmLoading(false);
                }, 1000);
                form.resetFields();
            } else {
                setConfirmLoading(false);
                form.resetFields();
            }
        } catch (errorInfo) {
            console.log("Failed:", errorInfo);
        }
    };

    return (
        <Modal
            title="Input Form"
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
};

export default InputModal;