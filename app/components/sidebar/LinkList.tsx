"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image, { StaticImageData } from "next/image";
import arrowLeft from "../../../public/arrow-left.png";
import { useEffect, useState } from "react";

type LinkListData = {
    path?: string,
    pathWithId?: string,
    icon: StaticImageData,
    text: string
};

type LinkListProps = {
    data: LinkListData[],
    handleLogout: () => void
};


const LinkList = ({ data, handleLogout }: LinkListProps) => {
    const pathname = usePathname();
    const [sidebarData, setSidebarData] = useState<Array<{path: string, icon: StaticImageData, text: string}>>([]);

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        const newData = data.map(item => ({
            path: item.pathWithId ?
                item.pathWithId.replace(':userId', userId || '') : 
                (item.path || '/'),
            icon: item.icon,
            text: item.text
        }));

        setSidebarData(newData);
    }, [data]);

    return (
        <>
            {sidebarData.map((linkData, key) => (
                <div key={key} className="mt-7 text-2xl text-[#F26B0F]">
                    <Link href={linkData.path} className={`flex items-center justify-center mb-2 hover:text-[#F26B0F] relative p-2 ${pathname == linkData.path ? "before:absolute before:inset-0 before:bg-white before:right-[-100px] before:z-[-1] before:rounded-l-xl" :
                        "-"}
                            `}>
                        <Image src={linkData.icon} alt="icon" width={50}
                            className="filter brightness-0"
                            style={{
                                filter: "brightness(0) saturate(100%) invert(48%) sepia(94%) saturate(2299%) hue-rotate(346deg) brightness(98%) contrast(93%)"
                            }}
                        />
                        <span className="text-2xl ml-4">{linkData.text}</span>
                    </Link>
                </div>
            ))}
            <div className="mt-7 text-2xl">
                <div className="flex items-center justify-center relative p-2 text-[#F26B0F] hover:text-[#F26B0F]">
                    <Image src={arrowLeft} alt="icon" width={50}
                        className="filter brightness-0"
                        style={{
                            filter: "brightness(0) saturate(100%) invert(48%) sepia(94%) saturate(2299%) hue-rotate(346deg) brightness(98%) contrast(93%)"
                        }}
                    />
                    <span className="ml-4">
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    </span>
                </div>
            </div>
        </>
    )
}

export default LinkList;