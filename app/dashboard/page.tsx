"use client";

import { Content } from "antd/es/layout/layout";
import Card from "../components/dashboard/Card";
import Chart from "../components/dashboard/Chart";
import GridCard from "../components/dashboard/GridCard";

const DashboardPage = () => {
    return (
        <Content className="p-12">
            <div className="text-[#F26B0F]">
                <h1 className="text-6xl mb-24">Statistik Penjualan</h1>
                <GridCard>
                    <Card>
                        <p className="text-2xl font-bold">Total Barang: 0</p>
                        <p className="text-2xl font-bold">Total Barang Terjual: 0</p>
                    </Card>
                    <Card>
                        <p className="text-2xl font-bold">Pembeli Teratas</p>
                        <ol className="text-xl list-decimal pl-5">
                            <li>Asep</li>
                            <li>Sunandar</li>
                            <li>Doe</li>
                        </ol>
                    </Card>
                </GridCard>
                <GridCard>
                    <Card>
                        <Chart />
                    </Card>
                    <div className="flex flex-col gap-8">
                        <Card>
                            <p className="text-2xl font-bold">Barang Teratas</p>
                            <ol className="text-xl list-decimal pl-5">
                                <li>Komputer</li>
                                <li>Laptop</li>
                                <li>Handphone</li>
                            </ol>
                        </Card>
                        <div className="bg-[#F26B0F] text-white p-4 rounded-md font-bold text-center">
                            <p className="text-2xl">Profit: Rp 30.000</p>
                        </div>
                    </div>
                </GridCard>
            </div>
        </Content>
    )
}

export default DashboardPage;