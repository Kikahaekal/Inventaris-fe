"use client";
import React from 'react';
import { Layout, Menu } from 'antd';
import SideBar from '../ui/sidebar';
const { Header, Content, Footer } = Layout;

type LayoutProps = {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: LayoutProps) => {
    return (
        <Layout className='min-h-screen bg-white'>
           <SideBar />
           <Layout className='bg-white'>
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default DashboardLayout;