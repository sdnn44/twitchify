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

// api.js
export async function handleGameClick(gameId: string) {
    try {
        const response = await fetch(`http://localhost:3000/get-clips/${gameId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch clips');
        }
        const data = await response.json();
        let conter = 1;
        console.log(conter);
        conter++;
        console.log('Clips received:', data);
        return data;
        // Handle the fetched data here
    } catch (error) {
        console.error('Error fetching clips:', error);
        // Handle error
    }
};
