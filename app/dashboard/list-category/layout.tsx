"use client";
import React from 'react';
import { Content } from 'antd/es/layout/layout';
import { CategoryProvider } from '@/app/Context/CategoryContext';

type LayoutProps = {
    children: React.ReactNode
}

const BarangLayout = ({ children }: LayoutProps) => {
    return (
        <CategoryProvider>
            <Content className='p-12'>
                {children}
            </Content>
        </CategoryProvider>
    )
}

export default BarangLayout;