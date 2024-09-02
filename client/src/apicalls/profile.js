import axiosInstance from "./index.js";

export const addProfile = async(payload) => {
    try {
        console.log(payload);
        const response = await axiosInstance.post('/api/profile', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};