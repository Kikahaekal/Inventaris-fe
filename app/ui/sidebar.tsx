"use client";

import { Layout } from "antd";
import iconTitle from "../../public/icon-title.png";
import homeTitle from "../../public/home.png";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
const { Sider } = Layout;

const SideBar = () => {
    const pathname = usePathname();

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
                    <Image src={iconTitle} alt="iconTitle" width={50}/>
                    <p className="text-3xl mt-4 font-bold text-[#F26B0F]">Inventaris</p>
                </div>

                <div className="mt-7 text-2xl text-[#F26B0F]">
                    <Link href="/dashboard" className={`flex items-center justify-center relative p-2 ${
                        pathname == "/dashboard" ? "before:absolute before:inset-0 before:bg-white before:right-[-100px] before:z-[-1] before:rounded-l-xl" : 
                        "-"}
                    `}>
                        <Image src={homeTitle} alt="homeTitle" width={50}/>
                        <span className="text-2xl ml-4">Dashboard</span>
                    </Link>
                </div>
            </div>
        </Sider>
    );
}

export default SideBar;