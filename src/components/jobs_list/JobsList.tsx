import { useFilter, useJobs } from "@/hooks";
import { IJob } from "@/interfaces";
import { Button } from "flowbite-react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { HiXCircle } from "react-icons/hi";
import { RefineJobs } from "../refine_jobs";
import { ResultsInfo } from "../results_info/ResultsInfo";
import { JobSearch } from "../search/JobSearch";
import { JobsCollapsibles } from "./JobsCollapsibles";

export const JobsList: FC = () => {
  const router = useRouter();
  const { jobs } = useJobs();
  const { clearFilters, totalNumOfFilters } = useFilter();
  const [jobToDisplay, setJobsToDisplay] = useState<IJob[]>();

  // useEffect(() => {
  //   if (!router.isReady) return;
  //   // retrieveFilters();
  // }, [router.isReady]);

  useEffect(() => {
    setJobsToDisplay(jobs);
  }, [router, router.locale, jobs]);

  // console.log("jobToDisplay = ", jobToDisplay);

  if (!jobToDisplay) return null;

  return (
    <section className="mx-auto flex flex-col">
      <div className="w-full">
        <JobSearch />
      </div>
      {totalNumOfFilters > 0 && (
        <div className="ml-5 mb-5 flex w-full">
          <Button
            color="light"
            onClick={() => clearFilters()}
            type="button"
            className=""
          >
            <HiXCircle className={`mr-3 transition-all`} />
            Clear all filters
          </Button>
        </div>
      )}

      <div className="flex w-full flex-col justify-center md:flex-row">
        <div className="mb-8 w-full md:mb-0 md:w-1/3 md:px-5">
          <RefineJobs />
        </div>
        <div className="flex w-full flex-col md:ml-6 md:w-2/3">
          <ResultsInfo />
          <JobsCollapsibles />
        </div>
      </div>
    </section>
  );
};
