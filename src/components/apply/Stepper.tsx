import { FormContext } from "@/context/FormContext";
import { STEPS } from "@/interfaces";
import { Timeline } from "flowbite-react";
import { FC, useContext, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { HiCheckCircle } from "react-icons/hi";

export const StepperItemVisited: FC<{
  fullTitle: string;
  shortTitle: string;
}> = ({ fullTitle, shortTitle }) => {
  return (
    <li className="after:border-1 flex items-center text-blue-600 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-blue-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
      <div className="flex items-center after:mx-2 after:font-light after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
        <HiCheckCircle
          fill="currentColor"
          className="mr-2 h-4 w-4 sm:h-5 sm:w-5"
          viewBox="0 0 20 20"
          aria-hidden="true"
        />
        <div className="flex whitespace-nowrap">
          <span className="hidden sm:inline-flex">{fullTitle}</span>
          <span className="inline-flex sm:hidden">{shortTitle}</span>
        </div>
      </div>
    </li>
  );
};

export const StepperItemFuture: FC<{
  number: number;
  fullTitle: string;
  shortTitle: string;
}> = ({ number, fullTitle, shortTitle }) => {
  return (
    <li className="after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 after:content-[''] dark:after:border-gray-700 sm:after:inline-block md:w-full xl:after:mx-10">
      <div className="flex items-center after:mx-2 after:font-light after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
        <div className="flex whitespace-nowrap">
          <span className="mr-2">{number}.</span>
          <span className="hidden sm:inline-flex">{fullTitle}</span>
          <span className="inline-flex sm:hidden">{shortTitle}</span>
        </div>
      </div>
    </li>
  );
};

export const Stepper = () => {
  const { stepsStatus } = useContext(FormContext);
  const { t } = useTranslation("common");

  const mapper: {
    [k: string]: {
      fullTitle: string;
      shortTitle: string;
    };
  } = {
    resume: {
      fullTitle: t("apply.resume.stepper_full"),
      shortTitle: t("apply.resume.stepper_short"),
    },
    info: {
      fullTitle: t("apply.info.stepper_full"),
      shortTitle: t("apply.info.stepper_short"),
    },
    questions: {
      fullTitle: t("apply.questions.stepper_full"),
      shortTitle: t("apply.questions.stepper_short"),
    },
    review: {
      fullTitle: t("apply.review.stepper_full"),
      shortTitle: t("apply.review.stepper_short"),
    },
  };

  return (
    <div className="mt-8 flex w-full justify-center">
      <ol className="flex w-full items-center text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
        {STEPS.map((STEP, i) => {
          const itemProps = {
            shortTitle: mapper[STEP].shortTitle,
            fullTitle: mapper[STEP].fullTitle,
          };
          if (stepsStatus[STEP].visited)
            return <StepperItemVisited {...itemProps} key={i} />;
          return <StepperItemFuture number={i + 1} {...itemProps} key={i} />;
        })}
      </ol>
    </div>
  );
};
