"use client"
import { useGlobalState } from "@/app/context/globalContextProvider";
import Image from "next/image";
import DisplayClip from "../ClipModals/DisplayClip";
import Modal from "../ClipModals/Modal";

function Header() {
  const { modal } = useGlobalState();

  return (
    <header className="bg-hero bg-center bg-cover bg-no-repeat sm:p-16 py-16 px-8 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0">
      <div className="flex-1 flex flex-col gap-10">
        <Image
          src="/twitch.png"
          alt="logo"
          width={101}
          height={96}
          className="object-contain"
        />
        <h1 className="sm:text-6xl text-5xl text-white lg:max-w-lg font-bold leading-[120%]">
          Daily dose of <span className="red-gradient">Twitch.tv </span>
          clips
        </h1>
      </div>
      <div className="lg:flex-1 relative w-full h-[50vh] justify-center border-2">
      </div>
      {modal && <Modal content={<DisplayClip />} />}
      
    </header>
  );
}

export default Header;