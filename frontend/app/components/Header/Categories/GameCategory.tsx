"use client"
import { handleGameClick } from '@/app/api/fetchClips';
import { useGlobalState } from '@/app/context/globalContextProvider';
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
  // onGameClick: (gameId: string) => void;
}

const GameCategory = ({ game /**onGameClick**/ }: Prop) => {

  const { setGameId, setLoading } = useGlobalState();

  return (
    <div className='flex flex-col'>
      <div
        className="flex items-center"
        onClick={() => {
          setGameId(game.game_id);
          handleGameClick(game.game_id);
          setLoading(true);
        }
        }
      >
        <div className='absolute bg-purple-400 w-28 h-40'></div>
        <Image
          src={game.game_img}
          alt="logo"
          width={120}
          height={100}
          className="object-contain w-full h-auto my-2 hover:translate-x-1 hover:-translate-y-1 z-10 transition ease-in cursor-pointer"
        />
      </div>

      <h2 className='text-sm text-white font-bold hover:text-purple-400 cursor-pointer transition'>{game.game_name}</h2>
    </div>
  )
}

export default GameCategory