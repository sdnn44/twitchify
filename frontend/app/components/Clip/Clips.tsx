"use client";

import ClipCard, { ClipProp } from "@/app/components/Clip/ClipCard";
import LoadMore from "@/app/components/LoadMore/LoadMore";
import React, { useEffect } from 'react'
import { useGlobalState } from "@/app/context/globalContextProvider";
import { fetchClips, fetchClipsByStreamerId, fetchSpecificGame } from "@/app/api/fetchClips";
import Loader from "../Loader/Loader";
import Filter from "./Fillters/Filter";
import Searchbar from "../Searchbar/Searchbar";
import StreamerInfoButton from "../Streamer/StreamerInfoButton";
import ClipLanguage from "../ClipLanguage/ClipLanguage";
import ClipLanguageButton from "../ClipLanguage/ClipLanguageButton";

interface ClipProps {
    title: string;
    clips: any[];
}

const Clips = ({ title, clips }: ClipProps) => {

    const { gameId, streamerId, clipLanguage, periodLabel, periodTime, setClips, setCursor, isLoading, setLoading, filterClips } = useGlobalState();

    // let clips = [];
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (streamerId) {
                    response = await fetchClipsByStreamerId(streamerId, periodLabel, periodTime);
                } else if (clips.length === 0) {
                    response = await fetchClips();
                } else {
                    response = await fetchSpecificGame(gameId, periodLabel, periodTime);
                }
                setClips(response.data);
                setCursor(response.pagination.cursor);
            } catch (error) {
                console.error('Error fetching clips:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [gameId, streamerId, clipLanguage, periodLabel]);

    return (
        <main className="sm:p-6 py-16 px-8 flex flex-col gap-10">
            <h2 className="text-lg text-white font-bold">{title}</h2>
            <div className="flex flex-col lg:flex-row lg:gap-3 justify-between gap-12 h-[200px] lg:max-h-10 z-10"> {/* max-h-10 */}
                <Filter />
                {/* <div className="flex flex-col justify-between h-[250px]"> */}
                {!streamerId && <ClipLanguage />}
                <Searchbar />
                {/* </div> */}
            </div>
            {streamerId && <StreamerInfoButton />}
            {clipLanguage && <ClipLanguageButton />}
            {isLoading ? (<Loader />) : (
                <>
                    <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                        {filterClips(clips).map((item: ClipProp, index: number) => (
                            <ClipCard key={item.id} clip={item} index={index} />
                        ))}
                    </section>
                    <LoadMore />
                </>
            )
            }
        </main>
    );
}

export default Clips;