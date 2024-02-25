"use server";

import axios from "axios";
const BASE_URL = "https://twitchify-server.vercel.app/get-gameinfo/";

export async function fetchGameInfoById(id: string) {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        // const data = await response.json();
        // console.log('Clips received:', response.data);

        const data = response.data.data.map((game: { box_art_url: string; }) => ({
            ...game,
            box_art_url: game.box_art_url.replace("{width}x{height}", "100x150")
        }));
        
        console.log('Clips received:', data);

        return data;
    } catch (error) {
        console.error('Error fetching clips:', error);
        throw error;
    }
}