"use client";
import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Spin } from 'antd';
import Link from 'next/link';
import api from '@/config/api';
import { useForm } from 'antd/es/form/Form';

type FieldType = {
  username?: string;
  password?: string;
  email?: string;
  address?: string;
};

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [form] = useForm();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsLoading(true);
        try {
            const res = await api.post('/users/register', values);
            if(res) {
                form.resetFields();
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
            // location.href = "/";
        }
    };

    if (isLoading) {
        return <Spin fullscreen />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="shadow-md p-10 rounded-lg w-full max-w-[600px]">
                <h1 className="text-3xl text-center mb-5">Halaman Register</h1>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please input a valid email!' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item className="mb-2">
                        <Button type="primary" htmlType="submit" className="w-full">
                            Register
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Link href="/" className="w-full block">
                            <Button type="default" className="w-full">
                                Back to Login
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}