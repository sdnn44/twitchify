"use server";

import axios from "axios";

const BASE_URL = "https://twitchify-server.vercel.app/";

async function fetchData(url: string) {
    try {
        const response = await axios.get(url);
        console.log('Clips received:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching clips:', error);
        throw error;
    }
}

export async function fetchClips() {
    return fetchData(`${BASE_URL}/get-clips`);
}

export async function fetchNextPageForGame(gameId: string, cursor: string, periodTime?: string) {
    const url = `${BASE_URL}/get-page/${gameId}/${cursor}${periodTime ? `/${periodTime}` : ''}`;
    return fetchData(url);
}

export async function fetchNextPageForStreamer(broadcasterId: string, cursor: string, periodTime?: string) {
    const url = `${BASE_URL}/get-page-by-broadcasterid/${broadcasterId}/${cursor}${periodTime ? `/${periodTime}` : ''}`;
    return fetchData(url);
}

export async function fetchSpecificGame(gameId: string, periodLabel?: string, periodTime?: string) {
    if (!periodLabel || !periodTime) return fetchData(`${BASE_URL}/get-clips/${gameId}`);

    const url = `${BASE_URL}/get-clips/${gameId}/${periodTime}`;
    return fetchData(url);
}

export async function fetchClipsByStreamerId(broadcasterId: string, periodLabel?: string, periodTime?: string) {
    if (!periodLabel || !periodTime) return fetchData(`${BASE_URL}/get-clips-by-broadcasterid/${broadcasterId}`);

    const url = `${BASE_URL}/get-clips-by-broadcasterid/${broadcasterId}/${periodTime}`;
    return fetchData(url);
}

// export async function fetchClips() {
//     try {
//         const response = await axios.get('http://localhost:3000/get-clips');
//         // const data = await response.json();
//         console.log('Clips received:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching clips:', error);
//         throw error;
//     }
// }

// export async function fetchNextPageForGame(gameId: string, cursor: string, periodTime?: string) {
//     const url = periodTime
//         ? `http://localhost:3000/get-page/${gameId}/${cursor}/${periodTime}`
//         : `http://localhost:3000/get-page/${gameId}/${cursor}`;
//     try {
//         const response = await axios.get(url);
//         // const data = await response.json();
//         console.log('Clips received:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching clips:', error);
//         throw error;
//     }
// }

// export async function fetchNextPageForStreamer(broadcasterId: string, cursor: string, periodTime?: string) {
//     const url = periodTime
//         ? `http://localhost:3000/get-page-by-broadcasterid/${broadcasterId}/${cursor}/${periodTime}`
//         : `http://localhost:3000/get-page-by-broadcasterid/${broadcasterId}/${cursor}`;
//     try {
//         const response = await axios.get(url);
//         // const data = await response.json();
//         console.log('Clips received:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching clips:', error);
//         throw error;
//     }
// }

// export async function fetchSpecificGame(gameId: string, periodLabel?: string, periodTime?: string) {
//     // 2017-11-30T22:34:18Z
//     let url = `http://localhost:3000/get-clips/${gameId}`;
//     if (periodTime) {
//         switch (periodLabel) {
//             case 'Today':
//                 url += `/${periodTime}`
//                 break;
//             case '7 days':
//                 url += `/${periodTime}`
//                 break;
//             case '30 days':
//                 url += `/${periodTime}`
//                 break;
//             default:
//                 url = ``;
//         }
//     }

//     try {
//         const response = await axios.get(url);
//         if (response.status !== 200) {
//             throw new Error('Failed to fetch clips');
//         }
//         // const data = await response.json();
//         console.log('Clips received:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching clips:', error);
//     }
// };

// export async function fetchClipsByStreamerId(broadcasterId: string, periodLabel?: string, periodTime?: string) {
//     let url = `http://localhost:3000/get-clips-by-broadcasterid/${broadcasterId}`;
//     if (periodTime) {
//         switch (periodLabel) {
//             case 'Today':
//                 url += `/${periodTime}`
//                 break;
//             case '7 days':
//                 url += `/${periodTime}`
//                 break;
//             case '30 days':
//                 url += `/${periodTime}`
//                 break;
//             default:
//                 url = ``;
//         }
//     }

//     try {
//         const response = await axios.get(url);
//         if (response.status !== 200) {
//             throw new Error('Failed to fetch clips');
//         }
//         // const data = await response.json();
//         console.log('Clips received:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching clips:', error);
//     }
// }
