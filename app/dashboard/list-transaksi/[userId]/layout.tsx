"use client";
import React from 'react';
import { Content } from 'antd/es/layout/layout';

type LayoutProps = {
    children: React.ReactNode
}

const BarangLayout = ({ children }: LayoutProps) => {
    return (
        <Content className='p-12'>
            {children}
        </Content>
    )
}

export default BarangLayout;