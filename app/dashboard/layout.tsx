"use client";
import React from 'react';
import data from "../link-data/data";
import api from '@/config/api';
import { Layout } from 'antd';
import SideBar from '../ui/sidebar';
import LinkList from '../components/sidebar/LinkList';

type LayoutProps = {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: LayoutProps) => {
    const handleLogout = async () => {
        try {
            await api.post('users/logout', {});
            // menghapus cookie authToken
            document.cookie = 'authToken=; path=/; max-age=0;';
            location.href = '/';
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout className='min-h-screen bg-white'>
           <SideBar>
                <LinkList data={data} handleLogout={handleLogout}/>
           </SideBar>
           <Layout className='bg-white'>
                {children}
            </Layout>
        </Layout>
    )
}

export default DashboardLayout;