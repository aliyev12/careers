import { FormContext } from "@/context/FormContext";
import { useAuth, useCodeAndSlug, useFilter, useJobs } from "@/hooks";
import { EStep } from "@/interfaces";
import { log } from "@/utils";
import { Button } from "flowbite-react";
import { FC, useCallback, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { JobQuestions } from "./JobQuestions";
import { PersonalQuestions } from "./info/PersonalQuestions";
import { Review } from "./Review";
import { Stepper } from "./Stepper";
import { UploadResume } from "./UploadResume";
import { GetStarted } from "./GetStarted";

export const Apply: FC = () => {
  const { jobs } = useJobs();
  const { status, code, slug } = useCodeAndSlug();
  const { t } = useTranslation();
  const { filters } = useFilter();
  const { user } = useAuth();
  const { step, nextStep, stepsStatus, validateSteps, uloadedResume, asGuest } =
    useContext(FormContext);

  if (status === "fail") return null;

  const job = jobs.find((j) => j.code === code && j.slug === slug);

  if (!job) {
    log({
      message: `Job with code "${code}" and slug "${slug}" wasn't found.`,
    });
    return null;
  }

  // console.log("validateSteps(step) = ", validateSteps(step));

  // const stepIsInvalid = useMemo(() => {
  //   return validateSteps(step);
  // }, [uloadedResume]);
  const stepIsInvalid = useMemo(() => {
    return !validateSteps(step);
  }, [uloadedResume.exists, step]);
  // const stepIsInvalid = validateSteps(step);

  if (step === EStep.getStarted) return <GetStarted />;

  return (
    <div className="mb-28">
      <Stepper />
      <div className="my-8 flex w-full justify-center">
        <h3>{job.title}</h3>
      </div>
      {step === EStep.resume && <UploadResume />}
      {step === EStep.info && <PersonalQuestions />}
      {step === EStep.questions && <JobQuestions />}
      {step === EStep.review && <Review />}
      {/* <div className="flex w-full items-center justify-center">
        <Button disabled={stepIsInvalid} onClick={() => nextStep()}>
          {t("apply.continue")}
        </Button>
      </div> */}
    </div>
  );
};
