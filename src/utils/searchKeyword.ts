import { IJob } from "@/interfaces";
import Fuse from "fuse.js";

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: [
    "title",
    // "author.firstName"
  ],
};

export function searchKeyword(jobs: IJob[], keyword: string): IJob[] {
  const fuse = new Fuse(jobs, options);
  const result = fuse.search(keyword);

  if (result && result.length) {
    const newFilteredJobs = result.map((r) => r.item);
    return newFilteredJobs;
  }
  return jobs;
}
