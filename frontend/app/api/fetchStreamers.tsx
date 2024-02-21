"use server";

import axios from "axios";

export async function fetchStreamerByName(name: string) {
    try {
        const response = await axios.get(`http://localhost:3000/get-channel/${name}`);
        // const data = await response.json();
        console.log('Clips received:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching clips:', error);
        throw error;
    }
}