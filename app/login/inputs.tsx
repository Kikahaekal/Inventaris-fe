import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Form, Input, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import api from '@/config/api';
import Link from 'next/link';

type FieldType = {
  username?: string,
  password?: string
};

const Inputs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setIsLoading(true);

    try {
      const res = await api.post('users/auth', values);
      console.log(res);
      if (res.success) {
        document.cookie = `authToken=${res.token}; path=/;`
        localStorage.setItem('userId', res.userId);
        location.href = '/dashboard';
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }

  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  if (isLoading) {
    return <Spin fullscreen />;
  }

  return (
    <div className='flex justify-center items-center'>
      <div>
        <p className='text-5xl text-center mb-5 text-[#F26B0F]'>Selamat Datang</p>

        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          layout='vertical'
          className='space-y-6'
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Harap masukkan username anda!' }]}
          >
            <Input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Harap masukkan password anda!' }]}
          >
            <Input.Password
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            />
          </Form.Item>

          <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
            Login
          </button>
          <div className="text-center">
            <p className="text-gray-600">Belum punya akun?</p>
            <Link href="/register" className="text-orange-500 hover:underline hover:text-orange-500">Daftar Sekarang</Link>
          </div>
      </Form>
    </div>
    </div >
  );
}



export default Inputs;
