import { IFilters, IJob } from "@/interfaces";
import { FILTERS } from "@/utils";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function useFilter() {
  const { state, setState } = useContext(GlobalContext);

  function updateFilters(filters: IFilters) {
    const newFilters = { ...state.filters, ...filters };
    console.log("newFilters = ", newFilters);

    const filteredJobs = getFilteredJobs(newFilters);
    const newJobsState = { ...state.jobsState, filteredJobs };
    setState({
      ...state,
      filters: newFilters,
      jobsState: newJobsState,
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
  const numOfCheckedCities = getNumOfCheckedFilters(FILTERS.cities);

  function getFilteredJobs(filters: IFilters) {
    const jobs = state.jobsState.jobs;
    // const jobs = state.jobsState.filteredJobs;
    let filteredJobs: IJob[] = jobs;

    for (const filter in filters) {
      const checkedValues = filters[filter];
      // if (checkedValues.length === 0) {
      //   continue;
      // }

      if (checkedValues.length === 0) {
        filteredJobs = filteredJobs;
      } else {
        if (filter === FILTERS.USStates) {
          filteredJobs = filteredJobs.filter((job) => {
            if (job.jobLocations) {
              return job.jobLocations.some((location) => {
                if (!location.state) return true;
                return checkedValues.includes(location.state);
              });
            } else {
              return true;
            }
          });
        } else if (filter === FILTERS.cities) {
          filteredJobs = filteredJobs.filter((job) => {
            if (job.jobLocations) {
              return job.jobLocations.some((location) => {
                if (!location.city) return true;
                return checkedValues.includes(location.city);
              });
            } else {
              return true;
            }
          });
        }
      }
    }
    return filteredJobs;
  }

  return {
    filters: state.filters,
    updateFilters,
    numOfCheckedStates,
    numOfCheckedCities,
    filteredJobs: state.jobsState.filteredJobs,
  };
}
