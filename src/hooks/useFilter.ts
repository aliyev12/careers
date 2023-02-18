import { IFilters, IJob } from "@/interfaces";
import { FILTERS, searchKeyword } from "@/utils";
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

  function removeFilter(filter: string, item: string) {
    const newStateFilters = { ...state.filters };
    let newFilters = newStateFilters[filter];
    console.log("filter = ", filter);
    if (Array.isArray(newFilters)) {
      newFilters = newFilters as string[];
      const itemIndex = newFilters.indexOf(item);
      if (itemIndex > -1) {
        newFilters.splice(itemIndex, 1);

        const newStateFilters = {
          ...state.filters,
          [filter]: newFilters,
        };

        const newFilteredJobs = getFilteredJobs(newStateFilters);

        setState({
          ...state,
          filters: newStateFilters,
          jobsState: {
            ...state.jobsState,
            filteredJobs: newFilteredJobs,
          },
        });
      }
    } else if (filter === "keyword") {
      const newStateFilters = {
        ...state.filters,
        [filter]: "",
      };

      const newFilteredJobs = getFilteredJobs(newStateFilters);

      setState({
        ...state,
        filters: newStateFilters,
        jobsState: {
          ...state.jobsState,
          filteredJobs: newFilteredJobs,
        },
      });
    }
  }

  function clearFilters() {
    const newStateFilters = { ...state.filters };

    for (const filter in newStateFilters) {
      let newFilters: string | string[];
      if (Array.isArray(newStateFilters[filter])) {
        newFilters = [];
      } else {
        newFilters = "";
      }
      newStateFilters[filter] = newFilters;
    }

    const newFilteredJobs = getFilteredJobs(newStateFilters);

    setState({
      ...state,
      filters: newStateFilters,
      jobsState: {
        ...state.jobsState,
        filteredJobs: newFilteredJobs,
      },
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
  const numOfCheckedSchedules = getNumOfCheckedFilters(FILTERS.scheduleTypes);
  const numOfCheckedRemotes = getNumOfCheckedFilters(FILTERS.remoteWorks);

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
        } else if (filter === FILTERS.keyword) {
          filteredJobs = searchKeyword(filteredJobs, checkedValues as string);
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
        } else if (filter === FILTERS.scheduleTypes) {
          filteredJobs = filteredJobs.filter((job) => {
            if (job.scheduleTypes) {
              return job.scheduleTypes.some((type) => {
                if (!type) return true;
                return checkedValues.includes(type);
              });
            } else {
              return true;
            }
          });
        } else if (filter === FILTERS.remoteWorks) {
          filteredJobs = filteredJobs.filter((job) => {
            if (job.remoteWorks) {
              return job.remoteWorks.some((type) => {
                if (!type) return true;
                return checkedValues.includes(type);
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

  const totalNumOfFilters = Object.keys(state.filters).reduce((acc, curr) => {
    const filter = state.filters[curr];
    if (Array.isArray(filter)) {
      return acc + filter.length;
    } else if (typeof filter === "string" && filter.length > 0) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  // function

  return {
    filters: state.filters,
    updateFilters,
    numOfCheckedStates,
    numOfCheckedCities,
    numOfCheckedCountries,
    numOfCheckedJobCats,
    numOfCheckedExpLevels,
    numOfCheckedSchedules,
    numOfCheckedRemotes,
    totalNumOfFilters,
    removeFilter,
    clearFilters,
    filteredJobs: getFilteredJobs(state.filters),
  };
}
