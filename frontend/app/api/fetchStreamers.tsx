"use server";

import axios from "axios";
const BASE_URL = "https://twitchify-server.vercel.app/";

export async function fetchStreamerByName(name: string) {
    try {
        const response = await axios.get(`${BASE_URL}/${name}`);
        // const data = await response.json();
        console.log('Clips received:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching clips:', error);
        throw error;
    }
}