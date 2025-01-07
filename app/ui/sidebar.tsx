"use client";

import { Layout } from "antd";
const { Sider } = Layout;

const SideBar = () => {
    return (
        <Sider
            className="relative h-screen z-50"
            width={400}
            style={{
                backgroundImage: "url('/Mediq_Sverige_Kungsbacka_warehouse.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-white" />

        </Sider>
    );
}

export default SideBar;