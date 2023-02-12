import { IJob } from "./cms.interface";

export enum EMode {
  dark = "dark",
  light = "light",
}

export interface IGlobalContextState {
  jobsState: {
    isNotInitializes: boolean;
    jobs: IJob[];
  };
}

export interface IGlobalContextValue {
  state: IGlobalContextState;
  setState: React.Dispatch<React.SetStateAction<IGlobalContextState>>;
}
