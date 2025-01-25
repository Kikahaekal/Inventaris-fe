import { useCategory } from "@/app/Context/CategoryContext";
import { Button, Form, Input, Modal, Select, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { useContext, useState } from "react";
import type { SelectProps } from 'antd';

type InputModalProps = {
    modalOpen: boolean;
    closeModal: () => void;
    onSuccess: () => void;
};

type FieldType = {
    name: string;
    price: number;
    stock: number;
};

const InputModal = ({ modalOpen, closeModal, onSuccess }: InputModalProps) => {
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

    const handleOk = async () => {
        try {
            setConfirmLoading(true);
            onSuccess();
            setTimeout(() => {
                closeModal();
                setConfirmLoading(false);
            }, 2000);
        } catch (errorInfo) {
            console.log("Failed:", errorInfo);
        }
    };

    return (
        <Modal
            title="Input Form"
            open={modalOpen}
            onOk={handleOk}
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
                <Space style={{ width: '100%' }} direction="vertical">
                    <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    // defaultValue={['a10', 'c12']}
                    // onChange={handleChange}
                    options={options}
                    />
                </Space>
            </Form>
        </Modal>
    );
};

export default InputModal;
