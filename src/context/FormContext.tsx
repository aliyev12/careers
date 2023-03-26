import {
  EStep,
  IFormContextValue,
  IStepsStatus,
  IUploadedFile,
  STEPS,
} from "@/interfaces";
import { extractInfoFromParsedResume } from "@/utils/extractInfoFromParsedResume";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

import sample_parse_resume_res from "./sample_parse_resume_res.json";

const defaultUploadedResume = {
  exists: false,
  path: "",
  base64: null,
};

const defaultStepsStatus = {
  getStarted: {
    visited: true,
    valid: true,
  },
  resume: {
    visited: true,
    valid: false,
  },
  info: {
    visited: false,
    valid: false,
  },
  questions: {
    visited: false,
    valid: false,
  },
  review: {
    visited: false,
    valid: false,
  },
};

const defaultValue: IFormContextValue = {
  step: EStep.resume,
  stepsStatus: { ...defaultStepsStatus },
  parsedResume: {},
  // @ts-ignore
  // uloadedResume: { ...sample_uploaded_resume },
  uloadedResume: { ...defaultUploadedResume },
  nextStep: () => {},
  updateParsedResume: () => {},
  validateCurrentStep: () => {},
  setUloadedResume: (n) => {},
  validateSteps: (s) => false,
  asGuest: false,
  setAsGuest: (s) => {},
};

export const FormContext = createContext<IFormContextValue>(defaultValue);

export const FormProvider: FC<PropsWithChildren> = ({ children }) => {
  const [step, setStep] = useState<EStep>(EStep.resume);
  const [stepsStatus, setStepsStatus] = useState<IStepsStatus>({
    ...defaultStepsStatus,
  });
  const [parsedResume, setParsedResume] = useState<any>();
  // const [parsedResume, setParsedResume] = useState(
  //   sample_parse_resume_res as { [k: string]: any }
  // );
  // @ts-ignore
  const [uloadedResume, setUloadedResume] = useState<IUploadedFile>({
    ...defaultUploadedResume,
  });
  const [asGuest, setAsGuest] = useState(false);

  // useEffect(() => {
  //   console.log("uloadedResume = ", JSON.stringify(uloadedResume));
  // }, [uloadedResume]);

  function nextStep() {
    const stepIdx = STEPS.indexOf(step);
    if (stepIdx < STEPS.length - 1) {
      const nextStep = STEPS[stepIdx + 1];
      setStepsStatus({
        ...stepsStatus,
        [nextStep]: {
          ...stepsStatus[nextStep],
          visited: true,
        },
      });
      setStep(nextStep);
    }
  }

  function updateParsedResume(newParsedResume: { [k: string]: any }) {
    setParsedResume(newParsedResume);
  }

  function validateCurrentStep() {
    setStepsStatus({
      ...stepsStatus,
      [step]: {
        ...stepsStatus[step],
        valid: true,
      },
    });
  }

  const validateSteps = useCallback(
    (stp: string) => {
      // console.log("## validateSteps fired..");
      let valid = false;
      if (stp === "resume") {
        if (uloadedResume.exists) {
          valid = true;
        }
      } else if (stp === "info") {
        valid = true;
      }
      return valid;
    },
    [uloadedResume, step]
  );

  // function validateSteps(stp: string) {
  //   console.log("## validateSteps fired..");
  //   let valid = false;
  //   if (stp === "resume") {
  //     if (uloadedResume.exists) {
  //       valid = true;
  //     }
  //   }
  //   return valid;
  // }

  // write validation for continue button on apply

  const value = {
    step,
    stepsStatus,
    nextStep,
    parsedResume,
    uloadedResume,
    setUloadedResume,
    updateParsedResume,
    validateCurrentStep,
    validateSteps,
    asGuest,
    setAsGuest,
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
