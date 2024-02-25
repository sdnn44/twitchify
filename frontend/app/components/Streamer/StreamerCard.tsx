import { fetchSpecificGame } from '@/app/api/clips/fetchClips';
import { useGlobalState } from '@/app/context/globalContextProvider';
import Image from 'next/image';
import React from 'react'

export interface StreamerProp {
    broadcaster_language: string;
    broadcaster_login: string;
    display_name: string;
    game_id: string;
    game_name: string;
    id: string;
    is_live: boolean
    thumbnail_url: string;
    title: string;
}

interface Prop {
    streamer: StreamerProp;
    index: number;
}

function StreamerCard({ streamer, index }: Prop) {

    const { setStreamerId, setClipLanguage, setSearchedStreamerName, setLoading } = useGlobalState();

    return (
        <div
            className='w-full flex flex-row m-1 hover:bg-violet-700/15 cursor-pointer gap-3 items-center p-2'
            onClick={() => {
                // setGameId(game.game_id);
                setStreamerId(streamer.id);
                setSearchedStreamerName(streamer.display_name);
                setClipLanguage("");
                setLoading(true);
            }
            }>
            <Image src={streamer.thumbnail_url} width={50} height={50} className="flex rounded-full" alt={''} />
            <div className='flex flex-col'>
                <div className="flex items-center">
                    <span className="font-semibold">{streamer.broadcaster_login}</span>
                    <Image src="/twitch.png" width={5} height={5} className="w-3 h-3 mx-2" alt={''} />
                    <span className='uppercase text-[10px]'>{streamer.broadcaster_language}</span>
                    {streamer.is_live && <><div className='ml-4 w-[7px] h-[7px] rounded-2xl bg-rose-700 border-2 border-rose-700'></div><span className='m-1 uppercase text-[10px] text-red-700'>Live</span></>}
                </div>
                <div className="flex text-[10px]">
                    {streamer.title}
                </div>
            </div>
        </div>
    )
}

export default StreamerCard