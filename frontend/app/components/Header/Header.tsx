"use client"
import { useGlobalState } from "@/app/context/globalContextProvider";
import Image from "next/image";
import DisplayClip from "../ClipModals/DisplayClip";
import Modal from "../ClipModals/Modal";
import AnimateLogo from "./AnimateLogo/AnimateLogo";
import Categories from "./Categories/Categories";

function Header() {
  const { modal } = useGlobalState();

  return (
    <header className="bg-hero bg-center bg-cover bg-no-repeat bg-gradient-to-tr from-[#0F1117] to-purple-800 from-50% sm:p-16 py-16 px-8 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0">
      <div className="flex flex-2 flex-row md:flex-col md:items-start gap-5 sm:gap-10 justify-center items-center">
        <Image
          src="/twitch.png"
          alt="logo"
          width={100}
          height={100}
          className="object-contain"
        />
        <h1 className="sm:text-5xl text-5xl lg:max-w-lg font-bold leading-[120%] order">
          Daily dose of <span className="violet-gradient">Twitch.tv </span>
          clips
        </h1>
        <AnimateLogo />
      </div>
      {/* <div className="lg:flex-2 flex  w-full h-[50vh] justify-center"> */}
      <div className="flex-2 flex flex-col gap-10">
        <Categories />
      </div>
      {modal && <Modal content={<DisplayClip />} />}
    </header>
  );
}

export default Header;