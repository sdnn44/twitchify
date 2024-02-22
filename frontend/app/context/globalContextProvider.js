"use client";
import React, { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [clips, setClips] = useState([]);
  const [cursor, setCursor] = useState("");
  const [gameId, setGameId] = useState("743");
  const [streamerId, setStreamerId] = useState("");
  const [searchedStreamerName, setSearchedStreamerName] = useState("");
  const [periodLabel, setPeriodLabel] = useState("");
  const [periodTime, setPeriodTime] = useState("");
  const [modal, setModal] = useState(false);
  const [embedURL, setEmbedURL] = useState("");
  const [isLoading, setLoading] = useState(true);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        clips,
        setClips,
        cursor,
        setCursor,
        gameId,
        setGameId,
        streamerId,
        setStreamerId,
        searchedStreamerName,
        setSearchedStreamerName,
        periodLabel,
        setPeriodLabel,
        periodTime,
        setPeriodTime,
        modal,
        openModal,
        closeModal,
        embedURL,
        setEmbedURL,
        isLoading,
        setLoading,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
