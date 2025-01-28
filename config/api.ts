import { default as axios } from "axios";
import { message } from "antd";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const server = axios.create({
    baseURL: API_URL,
});

// const isClient = typeof window !== 'undefined';

const api = {
    get: async(url: string, params: any) => {
        try {
            const res = await server.get(url, {params});
            
            // if (res.data.message) {
            //     message.destroy();
            //     if (res.data.success) {
            //         message.success(res.data.message);
            //     } else {
            //         message.error(res.data.message);
            //     }
            // }

            return res.data;
        } catch (error: any) {
            // message.error(error.response?.data?.message || 'An error occurred');
            throw error;
        }
    },

    post: async(url: string, params: any) => {
        try {
            const res = await server.post(url, params);

            if (res.data.success) {
                if (res.data.message) {
                    message.success(res.data.message);
                }
            } else if (!res.data.success && res.data.message) {
                message.error(res.data.message);
            }

            return res.data;
        } catch (error: any) {
            message.error(error.response?.data?.message || 'An error occurred');
            throw error;
        }
    },

    put: async(url: string, params: any) => {
        try {
            const res = await server.put(url, params);

            if (res.data.success) {
                if (res.data.message) {
                    message.success(res.data.message);
                }
            } else if (!res.data.success && res.data.message) {
                message.error(res.data.message);
            }

            return res.data;
        } catch (error: any) {
            message.error(error.response?.data?.message || 'An error occurred');
            throw error;
        }
    },

    patch: async(url: string, params: any) => {
        try {
            const res = await server.patch(url, params);
            
            if(res.data.success && res.data.message) {
                message.success(res.data.message);
            } else if (res.data.message) {
                message.error(res.data.message);
            }
            return res.data;
        } catch (error: any) {
            message.error(error.response?.data?.message || 'An error occurred');
            throw error;
        }
    },

    delete: async(url: string, params: any) => {
        try {
            const res = await server.delete(url, {params});

            if(res.data.success && res.data.message) {
                message.success(res.data.message);
            } else if (res.data.message) {
                message.error(res.data.message);
            }

            return res.data;
        } catch (error: any) {
            message.error(error.response?.data?.message || 'An error occurred');
            throw error;
        }
    },
}

export default api;