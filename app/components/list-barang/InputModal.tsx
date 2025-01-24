import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";

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
            </Form>
        </Modal>
    );
};

export default InputModal;
