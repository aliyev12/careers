import { IGlobalContextState, IGlobalContextValue } from "@/interfaces";
import {
  createContext,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

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
      countries: [],
      jobCategory: [],
      experienceLevel: [],
      scheduleTypes: [],
      remoteWorks: [],
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
      keyword: "",
      USStates: [],
      cities: [],
      countries: ["US"],
      jobCategory: [],
      experienceLevel: [],
      scheduleTypes: [],
      remoteWorks: [],
    },
  });

  // useEffect(() => {
  //   console.log("filters changes = ", state.filters);
  // }, [state.filters]);
  // useEffect(() => {
  //   console.log(" jobs = ", state.jobsState.jobs);
  // }, [state.jobsState.jobs]);

  const value = {
    state,
    setState,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
