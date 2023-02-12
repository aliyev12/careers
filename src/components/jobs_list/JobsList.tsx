import { useJobs } from "@/hooks";
import { IJob } from "@/interfaces";
import { FC } from "react";
import { JobsCollapsibles } from "./JobsCollapsibles";
import { JobsFilter } from "./JobsFilter";

export const JobsList: FC = () => {
  const { jobs } = useJobs();

  console.log("jobs = ", jobs);

  return (
    <section className=" mx-auto flex w-full justify-center">
      <JobsFilter jobs={jobs} />
      <JobsCollapsibles jobs={jobs} />
    </section>
  );
};
