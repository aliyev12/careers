"use client";

import { EMode, IGlobalContextState, IGlobalContextValue } from "@/interfaces";
import React, { createContext, FC, PropsWithChildren, useState } from "react";

const defaultValue = {
  state: { mode: EMode.dark },
  setState: () => {},
};

export const GlobalContext = createContext<IGlobalContextValue>(defaultValue);

export const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<IGlobalContextState>({ mode: EMode.dark });

  const value = {
    state,
    setState,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
