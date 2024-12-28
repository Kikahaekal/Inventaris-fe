import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';

type FieldType = {
  username?: string,
  password?: string
};

const LoginCard = () => {
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <div className="shadow-md p-10 rounded-lg">
      <p className='text-3xl text-center mb-5'>Halaman Login</p>
      <Form
        name="basic"
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
