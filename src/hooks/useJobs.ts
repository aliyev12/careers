import { IJob } from "@/interfaces";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function useJobs(initialJobs?: IJob[]) {
  const { state, setState } = useContext(GlobalContext);

  function initJobsState(updatedJobs?: IJob[]) {
    if (state.jobsState.isNotInitializes && initialJobs) {
      setState({
        ...state,
        jobsState: {
          ...state.jobsState,
          isNotInitializes: false,
          jobs: initialJobs,
          filteredJobs: initialJobs,
        },
      });
    } else if (updatedJobs) {
      setState({
        ...state,
        jobsState: {
          ...state.jobsState,
          isNotInitializes: false,
          jobs: updatedJobs,
          filteredJobs: updatedJobs,
        },
      });
    }
  }

  return {
    jobs: state.jobsState.jobs,
    filteredJobs: state.jobsState.filteredJobs,
    initJobsState,
    jobsInitialized:
      !state.jobsState.isNotInitializes &&
      state.jobsState.jobs &&
      Array.isArray(state.jobsState.jobs) &&
      state.jobsState.jobs.length > 0,
  };
}
