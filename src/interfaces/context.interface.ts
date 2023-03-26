//* GLOBAL CONTEXT  */

import { Dispatch, SetStateAction } from "react";
import { IJob } from "./cms.interface";

export enum EMode {
  dark = "dark",
  light = "light",
}

export interface IFilters {
  [filter: string]: string[] | string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface IGlobalContextState {
  jobsState: {
    isNotInitializes: boolean;
    jobs: IJob[];
    filteredJobs: IJob[];
  };
  filters: IFilters;
  user: IUser | null;
}

export interface IGlobalContextValue {
  state: IGlobalContextState;
  setState: React.Dispatch<React.SetStateAction<IGlobalContextState>>;
}

//* FORM CONTEXT  */
export enum EStep {
  getStarted = "getStarted",
  resume = "resume",
  info = "info",
  questions = "questions",
  review = "review",
}

export const STEPS: EStep[] = [
  EStep.getStarted,
  EStep.resume,
  EStep.info,
  EStep.questions,
  EStep.review,
];

export interface IStepStatus {
  visited: boolean;
  valid: boolean;
}

export interface IStepsStatus {
  getStarted: IStepStatus;
  resume: IStepStatus;
  info: IStepStatus;
  questions: IStepStatus;
  review: IStepStatus;
}

export interface IUploadedFile {
  exists: boolean;
  path: string;
  base64: string | ArrayBuffer | null;
}

export interface IFormContextValue {
  step: EStep;
  stepsStatus: IStepsStatus;
  parsedResume: { [k: string]: any };
  nextStep: () => void;
  validateCurrentStep: () => void;
  updateParsedResume: (n: { [k: string]: any }) => void;
  uloadedResume: IUploadedFile;
  setUloadedResume: Dispatch<SetStateAction<IUploadedFile>>;
  validateSteps: (s: string) => boolean;
  asGuest: boolean;
  setAsGuest: Dispatch<SetStateAction<boolean>>;
}
