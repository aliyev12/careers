import { IGlobalContextState, IGlobalContextValue } from "@/interfaces";
import { updateFiltersSearchParams } from "@/utils";
import { useRouter } from "next/router";
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
      keyword: "",
      USStates: [],
      cities: [],
      countries: [],
      jobCategory: [],
      experienceLevel: [],
      scheduleTypes: [],
      remoteWorks: [],
    },
    user: null,
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
    user: null,
  });
  // const router = useRouter();

  // useEffect(() => {
  //   if (!router.isReady) return;
  //   const updatedQuery = updateFiltersSearchParams(state.filters, router.query);
  //   router.push({ query: updatedQuery });
  // }, [router.isReady, state.filters]);

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
