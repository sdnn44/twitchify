"use client";
import React, { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [clips, setClips] = useState([]);
  const [gameId, setGameId] = useState("");
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
        gameId,
        setGameId,
        modal,
        openModal,
        closeModal,
        embedURL,
        setEmbedURL,
        isLoading,
        setLoading
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
