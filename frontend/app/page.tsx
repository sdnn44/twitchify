import ClipCard, { ClipProp } from "@/app/components/Clip/ClipCard";
import LoadMore from "@/app/components/LoadMore/LoadMore";
import { fetchClips } from "./api/fetchClips";

async function Home() {

  let clips = [];
  try {
    // Fetch clips data
    clips = await fetchClips();
    // Check if data is received and is an array
    if (!Array.isArray(clips.data)) {
      throw new Error('Data is not in the expected format');
    }
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }

  return (
    <main className="sm:p-6 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-l text-white font-bold">These clips are short, each lasting less than a minute, and they've been crafted by viewers on Twitch.</h2>

      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {clips.data.map((item: ClipProp, index: number) => (
          <ClipCard key={item.id} clip={item} index={index} />
        ))}
      </section>
      <LoadMore />
    </main>
  );
}

export default Home;