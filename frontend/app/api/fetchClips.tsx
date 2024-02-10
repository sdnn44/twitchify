// "use server";

export async function fetchClips() {
    try {
        const response = await fetch('http://localhost:3000/get-clips');
        const data = await response.json();
        console.log('Clips received:', data);
        // Process the received clips data here
        return data;
    } catch (error) {
        console.error('Error fetching clips:', error);
        throw error;
    }
}