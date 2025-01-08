"use client";

import { Layout } from "antd";
import iconTitle from "../../public/icon-title.png";
import Image from "next/image";
const { Sider } = Layout;

type SideBarProps = {
    children: React.ReactNode
}

const SideBar = ({children}: SideBarProps) => {
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
            <div className="absolute inset-0 bg-white/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-white" />
            <div className="relative px-16 pt-5">
                <div className="bg-white rounded-xl flex gap-3 items-center justify-center">
                    <Image src={iconTitle} alt="iconTitle" width={50} 
                        className="filter brightness-0"
                        style={{
                            filter: "brightness(0) saturate(100%) invert(48%) sepia(94%) saturate(2299%) hue-rotate(346deg) brightness(98%) contrast(93%)"
                        }}
                    />
                    <p className="text-3xl mt-4 font-bold text-[#F26B0F]">Inventaris</p>
                </div>
                {children}
            </div>
        </Sider>
    );
}

export default SideBar;