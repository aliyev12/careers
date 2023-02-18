import { IJobsRes } from "@/interfaces";
import { formatJobs } from "@/utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useJobs } from "./useJobs";

export function useInitContextJobs(data: IJobsRes) {
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
}
