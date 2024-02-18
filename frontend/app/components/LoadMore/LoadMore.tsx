"use client";
import { fetchNextPage } from "@/app/api/fetchClips";
import { useGlobalState } from "@/app/context/globalContextProvider";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ClipCard, { ClipProp } from "../Clip/ClipCard";

function LoadMore() {
  const { gameId, periodTime, cursor, setCursor } = useGlobalState();
  const { ref, inView } = useInView();

  const [data, setData] = useState<ClipProp[]>([]);

  useEffect(() => {
    if (inView) {

      const fetchData = async () => {
        try {
          const response = await fetchNextPage(gameId, cursor, periodTime);
          setData([...data, ...response.data])
          setCursor(response.pagination.cursor);
        } catch (error) {
          console.error('Error fetching clips:', error);
        }
      };

      fetchData();
    }
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item: ClipProp, index: number) => (
          <ClipCard key={item.id} clip={item} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;