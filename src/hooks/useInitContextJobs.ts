import { GlobalContext } from "@/context/GlobalContext";
import { IJobsRes } from "@/interfaces";
import { formatJobs } from "@/utils";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { useJobs } from "./useJobs";

export function useInitContextJobs(data: IJobsRes) {
  const { state, setState } = useContext(GlobalContext);
  const router = useRouter();
  const { initJobsState, jobsInitialized } = useJobs(formatJobs(data));
  const [currentLocale, setCurrentLocale] = useState("en");

  useEffect(() => {
    // console.log("$$$ formatJobs(data) = ", formatJobs(data));
    // console.log("$$$ jobsInitialized = ", jobsInitialized);
    if (data && !jobsInitialized) {
      initJobsState();
    } else if (router.locale !== currentLocale) {
      initJobsState(formatJobs(data));
    }
    setCurrentLocale(router.locale!);
  }, [router, router.locale]);

  return { jobs: state.jobsState.jobs, jobsInitialized };
}
