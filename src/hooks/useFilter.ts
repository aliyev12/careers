import { IFilters, IJob } from "@/interfaces";
import { FILTERS } from "@/utils";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function useFilter() {
  const { state, setState } = useContext(GlobalContext);

  function updateFilters(filters: IFilters) {
    const newFilters = { ...state.filters, ...filters };
    setState({
      ...state,
      filters: newFilters,
    });
  }

  function getNumOfCheckedFilters(filter: keyof IFilters): number {
    if (state.filters && state.filters[filter]) {
      return state.filters[filter]!.length;
    } else {
      return 0;
    }
  }

  const numOfCheckedStates = getNumOfCheckedFilters(FILTERS.USStates);

  function getFilteredJobs() {
    const jobs = state.jobsState.jobs;
    let filteredJobs: IJob[] = jobs;

    for (const filter in state.filters) {
      const checkedValues = state.filters[filter];
      if (checkedValues.length === 0) {
        continue;
      }
      if (filter === FILTERS.USStates) {
        filteredJobs = jobs.filter((job) => {
          if (job.jobLocations) {
            return job.jobLocations.some((location) => {
              if (!location.state) return true;
              return checkedValues.includes(location.state);
            });
          } else {
            return true;
          }
        });
      }
    }
    return filteredJobs;
  }

  return {
    filters: state.filters,
    updateFilters,
    numOfCheckedStates,
    filteredJobs: getFilteredJobs(),
  };
}
