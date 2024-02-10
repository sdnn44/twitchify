"use client";

import Image from "next/image";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import formatTime from '../../utils/durationFormat';
import { useGlobalState } from "@/app/context/globalContextProvider";

export interface ClipProp {
  id: string;
  broadcaster_name: string;
  thumbnail_url: string;
  title: string;
  creator_name: string;
  game_id: number;
  duration: number;
  view_count: number;
  embed_url: string;
}

interface Prop {
  clip: ClipProp;
  index: number;
}

function ClipCard({ clip }: Prop) {
  const { openModal, setEmbedURL } = useGlobalState();

  return (
    <div
      className="max-w-sm rounded relative w-full z-0"
      onClick={() => {
        openModal();
        setEmbedURL(clip.embed_url);
        console.log(clip.embed_url);
      }}>
      <div className="relative w-full overflow-hidden">
        <Image
          src={clip.thumbnail_url}
          alt={clip.broadcaster_name}
          width={300}
          height={250}
          className="rounded-xl hover:scale-110 transition ease-in duration-300 cursor-pointer"
        />
        <div className="bg-[#161921e7] text-xs font-bold p-1 px-3 rounded-xl absolute top-1 left-1">
          <p className=""><RemoveRedEyeIcon sx={{ fontSize: 14, mr: 1 }} />{clip.view_count.toLocaleString()}</p>
        </div>
        <div className="bg-[#161921e7] text-xs font-bold p-1 px-3 rounded-xl absolute top-1 right-1">
          <p>{formatTime(clip.duration)}</p>
        </div>
      </div>
      <div className="py-1 flex flex-row gap-1 bg-[#161921]">
        <div className="flex">
          <Image
            src="/chess.jpg"
            alt={clip.game_id.toString()}
            width={50}
            height={10}
            className=""
          />
        </div>
        <div className="flex flex-col justify-between items-center gap-1">
          <div className="py-1 px-2 rounded-sm h-full w-full">
            <p className="text-white text-sm font-bold w-full capitalize py-1">
              {clip.title.length > 25 ? `${clip.title.slice(0, 20)}...` : clip.title}
            </p>
            <p className="text-white text-xs line-clamp-1 w-full">
              {clip.broadcaster_name}
            </p>
            <h2 className="text-white text-xs line-clamp-1 w-full">
              Klip użytkownika {clip.creator_name}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClipCard;