"use server";

import axios from "axios";

export async function fetchStreamerByName(name: string) {
    try {
        const response = await axios.get(`https://twitchify-server.vercel.app/${name}`);
        // const data = await response.json();
        console.log('Clips received:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching clips:', error);
        throw error;
    }
}