"use client";
import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Spin } from 'antd';
import api from '@/config/api';
import { useForm } from 'antd/es/form/Form';
import RegisterForm from '../components/register/RegisterForm';
import RedirectText from '../components/register/RedirectText';

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
            await api.post('/users/register', values);
            location.href = "/";
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Spin fullscreen />;
    }

    return (
        <div className='bg-white shadow-xl rounded-lg overflow-hidden w-full max-w-7xl grid grid-cols-2 relative p-5'>
            <div>
                <p className='text-3xl text-center text-[#F26B0F]'>Daftar Akun</p>
                <RegisterForm form={form} onFinish={onFinish}/>
            </div>
            <div className="flex justify-center items-center">
                <RedirectText />
            </div>
        </div>
    );
}