"use client";
import React from 'react';
import { Content } from 'antd/es/layout/layout';
import { BarangProvider } from '@/app/Context/BarangContext';

type LayoutProps = {
    children: React.ReactNode
}

const BarangLayout = ({ children }: LayoutProps) => {
    return (
        <BarangProvider>
            <Content className='p-12'>
                {children}
            </Content>
        </BarangProvider>
    )
}

export default BarangLayout;