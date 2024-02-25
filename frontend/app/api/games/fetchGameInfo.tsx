"use server";

import axios from "axios";
const BASE_URL = "https://twitchify-server.vercel.app/get-gameinfo/";

export async function fetchGameInfoById(id: string) {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        // const data = await response.json();
        console.log('Clips received:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching clips:', error);
        throw error;
    }
}