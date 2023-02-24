import {
  EStep,
  IFormContextValue,
  IStepsStatus,
  IUploadedFile,
  STEPS,
} from "@/interfaces";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

import sample_parse_resume_res from "./sample_parse_resume_res.json";

const defaultUploadedResume = {
  exists: true,
  path: "",
  base64: null,
};

const defaultStepsStatus = {
  resume: {
    visited: true,
    valid: false,
  },
  info: {
    visited: true,
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
  uloadedResume: { ...defaultUploadedResume },
  nextStep: () => {},
  updateParsedResume: () => {},
  validateCurrentStep: () => {},
  setUloadedResume: (n) => {},
  validateSteps: (s) => false,
};

export const FormContext = createContext<IFormContextValue>(defaultValue);

export const FormProvider: FC<PropsWithChildren> = ({ children }) => {
  const [step, setStep] = useState<EStep>(EStep.info);
  const [stepsStatus, setStepsStatus] = useState<IStepsStatus>({
    ...defaultStepsStatus,
  });
  const [parsedResume, setParsedResume] = useState(
    sample_parse_resume_res as { [k: string]: any }
  );
  const [uloadedResume, setUloadedResume] = useState<IUploadedFile>({
    ...defaultUploadedResume,
  });

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
  };

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
