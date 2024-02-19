"use client";
// import { handleGameClick } from '@/app/api/fetchClips';
import React from 'react'
import { games } from '../../../../public/games';
import GameCategory, { GameCategoryProp } from './GameCategory';

const Categories = () => {

    return (
        <main className="sm:p-6 py-16 px-8 flex flex-col gap-10">
            <h2 className="poppins-regular text-4xl text-white font-semibold border-s-4 rounded border-s-violet-500">Discover</h2>

            <section className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                {games.map((item: GameCategoryProp, index: number) => (
                    <GameCategory key={item.id} game={item} index={index} /> /**onGameClick={handleGameClick} index={index} /> **/
                ))}
            </section>
        </main>
    )
}

export default Categories