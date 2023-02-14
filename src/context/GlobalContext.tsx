import { IGlobalContextState, IGlobalContextValue } from "@/interfaces";
import { createContext, FC, PropsWithChildren, useState } from "react";

const defaultValue: IGlobalContextValue = {
  state: {
    jobsState: {
      isNotInitializes: true,
      jobs: [],
      filteredJobs: [],
    },
    filters: {
      USStates: [],
      cities: [],
    },
  },
  setState: () => {},
};

export const GlobalContext = createContext<IGlobalContextValue>(defaultValue);

export const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<IGlobalContextState>({
    jobsState: {
      isNotInitializes: true,
      jobs: [],
      filteredJobs: [],
    },
    filters: {
      USStates: [],
      cities: [],
    },
  });

  const value = {
    state,
    setState,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
