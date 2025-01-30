import api from "@/config/api";
import { Button, Form, Input, Modal } from "antd";
import { FormProps, useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";


type InputModalProps = {
    modalOpen: boolean;
    categoryId: number | undefined;
    closeModal: () => void;
    getCategory: () => void;
};

type FieldType = {
    name: string,
}


export const EditModal = ({modalOpen, closeModal, categoryId, getCategory}: InputModalProps) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = useForm();

    useEffect(() => {
        const getCategory = async () => {
            try {
                const res = await api.get(`categories/${categoryId}`, {});

                if(res.success) {
                    form.setFieldsValue({
                        name: res.data.name
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }

        getCategory();
    }, [categoryId, form])

    const handleOk: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            setConfirmLoading(true);

            const res = await api.put(`categories/edit/${categoryId}`, values);

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
                    label="Nama Kategori"
                    rules={[{ required: true, message: "Please input the name!" }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}