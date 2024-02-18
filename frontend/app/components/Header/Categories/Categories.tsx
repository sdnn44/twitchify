"use client";
// import { handleGameClick } from '@/app/api/fetchClips';
import React from 'react'
import { games } from '../../../../public/games';
import GameCategory, { GameCategoryProp } from './GameCategory';

const Categories = () => {

    return (
        <main className="sm:p-6 py-16 px-8 flex flex-col gap-10">
            <h2 className="text-xl text-white font-bold">Choose category</h2>

            <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
                {games.map((item: GameCategoryProp, index: number) => (
                    <GameCategory key={item.id} game={item} index={index} /> /**onGameClick={handleGameClick} index={index} /> **/
                ))}
            </section>
        </main>
    )
}

export default Categories