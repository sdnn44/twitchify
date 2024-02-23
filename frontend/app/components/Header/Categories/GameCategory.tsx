"use client"
import { fetchSpecificGame } from '@/app/api/fetchClips';
import { useGlobalState } from '@/app/context/globalContextProvider';
import Image from 'next/image';
import React from 'react'
import { motion } from 'framer-motion';

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

  const { setGameId, setStreamerId, setClipLanguage, setLoading } = useGlobalState();

  return (
    <motion.div
      className='box flex flex-col'
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 200, damping: 5 }}
    >
      <div
        className="flex items-center"
        onClick={() => {
          setGameId(game.game_id);
          fetchSpecificGame(game.game_id);
          setStreamerId("");
          setClipLanguage("");
          setLoading(true);
        }
        }
      >
        <div className='absolute lg:bg-violet-500 w-32 h-44 bg-transparent'></div>
        <Image
          src={game.game_img}
          alt="logo"
          width={120}
          height={100}
          className="object-contain w-full h-auto my-2 hover:translate-x-1 hover:-translate-y-2 z-10 transition ease-in cursor-pointer"
        />
      </div>

      <h2 className='text-sm text-white font-bold hover:text-purple-400 cursor-pointer transition'>{game.game_name}</h2>
    </motion.div>
  )
}

export default GameCategory