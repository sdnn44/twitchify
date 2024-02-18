"use client";

import ClipCard, { ClipProp } from "@/app/components/Clip/ClipCard";
import LoadMore from "@/app/components/LoadMore/LoadMore";
import React, { useEffect } from 'react'
import { useGlobalState } from "@/app/context/globalContextProvider";
import { fetchClips, fetchSpecificGame } from "@/app/api/fetchClips";
import Loader from "../Loader/Loader";
import Filter from "./Fillters/Filter";

interface ClipProps {
    title: string;
    clips: any[];
}

const Clips = ({ title, clips }: ClipProps) => {

    const { gameId, periodLabel, periodTime, setClips, setCursor, isLoading, setLoading } = useGlobalState();

    // let clips = [];
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (clips.length === 0) {
                    const response = await fetchClips();
                    setClips(response.data);
                    setCursor(response.pagination.cursor);
                } else {
                    const response = await fetchSpecificGame(gameId, periodLabel, periodTime);
                    setClips(response.data);
                    setCursor(response.pagination.cursor);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching clips:', error);
            }
        };
        fetchData();
    }, [gameId, periodLabel]);

    return (
        <main className="sm:p-6 py-16 px-8 flex flex-col gap-10">
            <h2 className="text-lg text-white font-bold">{title}</h2>
            <Filter />
            {isLoading ? (<Loader />) : (
                <>
                    <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
                        {clips.map((item: ClipProp, index: number) => (
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