"use client";

import { useGlobalState } from '@/app/context/globalContextProvider';
import Image from 'next/image';
import React from 'react'

const DisplayClip = () => {
  const { embedURL } = useGlobalState();

  return (
    <div className="aspect-w-16 aspect-h-9 z-50">
      <iframe src={`${embedURL}&parent=twitchify.vercel.app`}  width="640" height="360" frameBorder="0" allow="fullscreen; picture-in-picture" allowFullScreen></iframe>
    </div>
  )
}

export default DisplayClip