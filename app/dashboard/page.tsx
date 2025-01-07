"use client";
import { Button } from "antd";
import api from "@/config/api";

const DashboardPage = () => {
    const handleLogout = async () => {
        try {
            await api.post('users/logout', {});
            location.href = '/';
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Button color="danger" variant="solid" onClick={handleLogout}>Logout</Button>
    )
}

export default DashboardPage;