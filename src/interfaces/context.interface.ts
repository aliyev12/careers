import { IJob } from "./cms.interface";

export enum EMode {
  dark = "dark",
  light = "light",
}

export interface IFilters {
  [filter: string]: string[] | string;
}

export interface IGlobalContextState {
  jobsState: {
    isNotInitializes: boolean;
    jobs: IJob[];
    filteredJobs: IJob[];
  };
  filters: IFilters;
}

export interface IGlobalContextValue {
  state: IGlobalContextState;
  setState: React.Dispatch<React.SetStateAction<IGlobalContextState>>;
}
