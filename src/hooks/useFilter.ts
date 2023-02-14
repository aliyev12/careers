import { IFilters, IJob } from "@/interfaces";
import { FILTERS } from "@/utils";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function useFilter() {
  const { state, setState } = useContext(GlobalContext);

  function updateFilters(filters: IFilters) {
    const newFilters = { ...state.filters, ...filters };
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
  const numOfCheckedCountries = getNumOfCheckedFilters(FILTERS.countries);
  const numOfCheckedJobCats = getNumOfCheckedFilters(FILTERS.jobCategory);
  const numOfCheckedExpLevels = getNumOfCheckedFilters(FILTERS.experienceLevel);

  function getFilteredJobs(filters: IFilters) {
    const jobs = state.jobsState.jobs;
    let filteredJobs: IJob[] = jobs;

    for (const filter in filters) {
      const checkedValues = filters[filter];

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
        } else if (filter === FILTERS.countries) {
          filteredJobs = filteredJobs.filter((job) => {
            if (job.jobLocations) {
              return job.jobLocations.some((location) => {
                if (!location.country) return true;
                return checkedValues.includes(location.country);
              });
            } else {
              return true;
            }
          });
        } else if (filter === FILTERS.jobCategory) {
          filteredJobs = filteredJobs.filter((job) => {
            if (job.jobCategory) {
              return checkedValues.includes(job.jobCategory);
            } else {
              return true;
            }
          });
        } else if (filter === FILTERS.experienceLevel) {
          filteredJobs = filteredJobs.filter((job) => {
            if (job.experienceLevel) {
              return job.experienceLevel.some((level) => {
                if (!level) return true;
                return checkedValues.includes(level);
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
    numOfCheckedCountries,
    numOfCheckedJobCats,
    numOfCheckedExpLevels,
    filteredJobs: state.jobsState.filteredJobs,
  };
}
