// "use server";

export async function fetchClips() {
    try {
        const response = await fetch('http://localhost:3000/get-clips');
        const data = await response.json();
        // Process the received clips data here
        return data;
    } catch (error) {
        console.error('Error fetching clips:', error);
        throw error;
    }
}

export async function handleGameClick(gameId: string, periodLabel?: string, periodTime?: string) {
    // 2017-11-30T22:34:18Z
    let url = `http://localhost:3000/get-clips/${gameId}`;
    if (periodTime) {
        switch (periodLabel) {
            case 'Today':
                url += `/${periodTime}`
                break;
            case '7 days':
                url += `/${periodTime}`
                break;
            case '30 days':
                url += `/${periodTime}`
                break;
            default:
                url = ``;
        }
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch clips');
        }
        const data = await response.json();
        return data;
        // Handle the fetched data here
    } catch (error) {
        console.error('Error fetching clips:', error);
        // Handle error
    }
};
