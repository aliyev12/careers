import { IJob } from "@/interfaces";

export function extractAvailableStates(jobs: IJob[]) {
  const extractedStates: string[] = [];

  jobs.forEach((job) => {
    if (job.jobLocations) {
      job.jobLocations.forEach((location) => {
        if (location.state && !extractedStates.includes(location.state)) {
          extractedStates.push(location.state);
        }
      });
    }
  });

  return extractedStates;
}
