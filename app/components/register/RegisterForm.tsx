"use client";
import React from 'react';
import { Button, Form, FormInstance, Input, } from 'antd';
import Link from 'next/link';

type RegisterFormProps = {
    form: FormInstance;
    onFinish: (value: any) => void
}

const RegisterForm = ({ form, onFinish }: RegisterFormProps) => {
    return (
        <div>
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

                <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                    Daftar
                </button>
            </Form>
        </div>
    )
}

export default RegisterForm;