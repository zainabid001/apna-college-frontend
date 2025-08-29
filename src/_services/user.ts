import axios from "axios";
const API = process.env.NEXT_PUBLIC_API_URL
export const userService = {
    register,
    login,
};

async function register(data: any) {
    try {
        const response = await axios.post(`${API}/users/register`,
            data,
            { headers: { Authorization: `Bearer `, } },
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

async function login(data: any) {
    try {
        const response = await axios.post(`${API}/users/login`,
            data,
            { headers: { Authorization: `Bearer `, } },
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};