"use client";
import Clips from "./components/Clip/Clips";
import { useGlobalState } from "./context/globalContextProvider";

export default function Home() {

  const { clips } = useGlobalState();

  return <Clips title="These clips are short, each lasting less than a minute, and they've been crafted by viewers on Twitch." clips={clips} />;

}
