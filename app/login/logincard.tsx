import React, { useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input, Spin } from 'antd';
import Link from 'next/link';
import { useForm } from 'antd/es/form/Form';
import api from '@/config/api';
// import { cookies } from 'next/headers';

type FieldType = {
  username?: string,
  password?: string
};

const LoginCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    setIsLoading(true);

    try {
      // const cookieStore = await cookies();
      const res = await api.post('users/auth', values);
      console.log(res);
      if (res.success) {
        // cookieStore.set('authToken', res.data.token);
        document.cookie = `authToken=${res.token}; path=/`;
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
    <div className="shadow-md p-10 rounded-lg">
      <p className='text-3xl text-center mb-5'>Halaman Login</p>
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" className='w-24'>
            Submit
          </Button>
        </Form.Item>
        <Form.Item className='flex justify-center'>
          <Link href="/register">
            <Button type='text' className='w-24'>Register</Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
}



export default LoginCard;
