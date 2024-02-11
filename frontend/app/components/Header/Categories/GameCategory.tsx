"use client"
import Image from 'next/image';
import React from 'react'

export interface GameCategoryProp {
  id: number;
  game_name: string;
  game_img: string;
  game_id: string;
}

interface Prop {
  game: GameCategoryProp;
  index: number;
}

const GameCategory = ({ game }: Prop) => {
  return (
    <div className='flex flex-col'>
      <div className="flex items-center">
        <div className='absolute bg-purple-400 w-28 h-40'></div>
        <Image
          src="/justchatting.jpg"
          alt="logo"
          width={120}
          height={100}
          className="object-contain my-2 hover:translate-x-1 hover:-translate-y-1 z-10 transition ease-in cursor-pointer"
        />
      </div>

      <h2 className='text-sm text-white font-bold hover:text-purple-400 cursor-pointer transition'>{game.game_name}</h2>
    </div>
  )
}

export default GameCategory