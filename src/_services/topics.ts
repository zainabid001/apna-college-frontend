import axios from "axios";
const API = process.env.NEXT_PUBLIC_API_URL
export const topicService = {
    create,
    allTopics,
};

async function create(data: any, token: any) {
    try {
        const response = await axios.post(`${API}/topics`,
            data,
            { headers: { Authorization: `Bearer ${token}`, } },
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
async function allTopics(token: any) {
    try {
        const response = await axios.get(`${API}/topics`,
            { headers: { Authorization: `Bearer ${token}`, } },
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
