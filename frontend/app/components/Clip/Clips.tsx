"use client";

import ClipCard, { ClipProp } from "@/app/components/Clip/ClipCard";
import LoadMore from "@/app/components/LoadMore/LoadMore";
import React, { useEffect } from 'react'
import { useGlobalState } from "@/app/context/globalContextProvider";
import { fetchClips, handleGameClick } from "@/app/api/fetchClips";
import Loader from "../Loader/Loader";
import Filter from "./Fillters/Filter";

interface ClipProps {
    title: string;
    clips: any[];
}

const Clips = ({ title, clips }: ClipProps) => {

    const { gameId, setClips, isLoading, setLoading } = useGlobalState();

    // let clips = [];

    useEffect(() => {

        if (clips.length === 0) {

            const fetchData = async () => {
                try {
                    const response = await fetchClips();
                    setClips(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching clips:', error);
                }
            };

            fetchData();
        } else {
            const fetchData = async () => {
                try {
                    const response = await handleGameClick(gameId);
                    setClips(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching clips:', error);
                }
            };

            fetchData();
        }
    }, [gameId]);


    // if (clip.length === 0) {
    //     try {
    //         // Fetch clips data
    //         clips = await fetchClips();
    //         // Check if data is received and is an array
    //         if (!Array.isArray(clips.data)) {
    //             throw new Error('Data is not in the expected format');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching or processing data:', error);
    //     }
    // } else {
    //     try {
    //         // Fetch clips data
    //         clips = await fetchClips();
    //         // Check if data is received and is an array
    //         if (!Array.isArray(clips.data)) {
    //             throw new Error('Data is not in the expected format');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching or processing data:', error);
    //     }
    // }


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