import axios from "axios";
const API = process.env.NEXT_PUBLIC_API_URL
export const subTopicService = {
    create,
    update,
};

async function create(data: any, token: string) {
    try {
        const response = await axios.post(`${API}/sub-topics`,
            data,
            { headers: { Authorization: `Bearer ${token}`, } },
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
async function update(token: string, id: string, data: any,) {
    try {
        const response = await axios.put(`${API}/sub-topics/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error", error);
        throw error;
    }
}