import api from "@/config/api";
import { Button, Form, Input, Modal } from "antd"
import { FormProps, useForm } from "antd/es/form/Form";
import { useState } from "react";

type InputModalProps = {
    modalOpen: boolean;
    closeModal: () => void;
    getCategory: () => void;
};

type FieldType = {
    name: string,
}

export const InputModal = ({ modalOpen, closeModal, getCategory}: InputModalProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = useForm();

    const handleOk: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            setConfirmLoading(true);

            const res = await api.post("categories/create", values);

            if(res.success) {
                setTimeout(() => {
                    setConfirmLoading(false);
                    closeModal();
                    getCategory();
                }, 1000);
                form.resetFields();
            } else {
                setConfirmLoading(false);
                form.resetFields();
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                    label="Nama Kategori"
                    rules={[{ required: true, message: "Please input the name!" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}