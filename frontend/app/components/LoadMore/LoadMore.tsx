"use client";
import { fetchNextPageForGame, fetchNextPageForStreamer } from "@/app/api/fetchClips";
import { useGlobalState } from "@/app/context/globalContextProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ClipCard, { ClipProp } from "../Clip/ClipCard";

function LoadMore() {
  const { gameId, streamerId, periodTime, cursor, filterClips, setCursor } = useGlobalState();
  const { ref, inView } = useInView();

  const [data, setData] = useState<ClipProp[]>([]);

  useEffect(() => {
    if (inView) {
      const fetchData = async () => {
        try {
          let response: { data: any; pagination: { cursor: any; }; };
          if (streamerId) {
            response = await fetchNextPageForStreamer(streamerId, cursor, periodTime);
          } else {
            response = await fetchNextPageForGame(gameId, cursor, periodTime);
          }
          setData(prevData => [...prevData, ...response.data])
          setCursor(response.pagination.cursor);
        } catch (error) {
          console.error('Error fetching clips:', error);
        }
      };
      if (cursor) {
        fetchData();
      }
    }
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {filterClips(data).map((item: ClipProp, index: number) => (
          <ClipCard key={item.id} clip={item} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {cursor && <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />}
        </div>
      </section>
    </>
  );
}

export default LoadMore;