"use client";

import React, { createContext, useContext, useState } from "react";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [modal, setModal] = useState(false);
  const [embedURL, setEmbedURL] = useState("");

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <GlobalContext.Provider
      value={{
        modal,
        openModal,
        closeModal,
        embedURL,
        setEmbedURL
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
