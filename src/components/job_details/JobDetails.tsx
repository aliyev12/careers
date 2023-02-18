import { useCodeAndSlug, useJobs } from "@/hooks";
import { log } from "@/utils";
import { FC } from "react";

export const JobsDetails: FC = () => {
  const { jobs } = useJobs();
  const { status, code, slug } = useCodeAndSlug();

  if (status === "fail") return null;

  const job = jobs.find((j) => j.code === code && j.slug === slug);

  if (!job) {
    log({
      message: `Job with code "${code}" and slug "${slug}" wasn't found.`,
    });
    return null;
  }

  // implement back to search results
  // add ability to add  filters into search params
  // then re-generate all the filters state based on search params..

  return (
    <div className="w-full">
      <div className="my-8 flex w-full justify-center">
        <h1>{job.title}</h1>
      </div>
      {job.jobLocations && (
        <div className="flex justify-center">
          <span className="text-lg">
            {job.jobLocations[0].city}, {job.jobLocations[0].state},{" "}
            {job.jobLocations[0].country}
          </span>
        </div>
      )}

      <div>
        <div>Code: {code}</div>
        <div>Slug: {slug}</div>
      </div>
    </div>
  );
};
