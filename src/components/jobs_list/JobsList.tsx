import { useJobs } from "@/hooks";
import { IJob } from "@/interfaces";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { RefineJobs } from "../refine_jobs";
import { JobsCollapsibles } from "./JobsCollapsibles";

export const JobsList: FC = () => {
  const { jobs } = useJobs();
  const router = useRouter();
  const [jobToDisplay, setJobsToDisplay] = useState<IJob[]>();

  useEffect(() => {
    setJobsToDisplay(jobs);
  }, [router, router.locale, jobs]);

  // console.log("jobToDisplay = ", jobToDisplay);

  if (!jobToDisplay) return null;

  return (
    <section className="mx-auto flex w-full flex-col justify-center md:flex-row">
      <RefineJobs />
      <JobsCollapsibles />
    </section>
  );
};
