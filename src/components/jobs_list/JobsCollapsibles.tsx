import { useFilter } from "@/hooks";
import { IAccordionsState, IJob } from "@/interfaces";
import { Button } from "flowbite-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { HiChevronDown, HiLink, HiStar } from "react-icons/hi";
import { setTimeout } from "timers";
import { JobCollapsibleContent } from "./JobCollapsibleContent";
import { getJobSpecifics, specialClass } from "./jobsListHelpers";

export const JobsCollapsibles: FC = () => {
  const { filteredJobs: jobs } = useFilter();
  const { t } = useTranslation("common");
  const [accordionsInitialized, setAccordionsInitialized] = useState(false);
  const [accordionsState, setAccordionsState] = useState<IAccordionsState>({});
  // const [jobsJson, setJobsJson] = useState("");
  const [jobsLength, setJobsLength] = useState("");

  useEffect(() => {
    if (!accordionsInitialized) {
      const newState: IAccordionsState = {};
      jobs.forEach((job, i) => {
        newState[`${i}`] = {
          expanded: false,
          accessibilityId: `job-${job.code}`,
        };
      });
      setAccordionsState(newState);
      setAccordionsInitialized(true);
      setJobsLength(jobs.map((j) => j.code).join());
    } else {
      const newJobsLength = jobs.map((j) => j.code).join();
      if (newJobsLength !== jobsLength) {
        const newState: IAccordionsState = { ...accordionsState };
        jobs.forEach((job, i) => {
          const idxKey = `${i}`;
          if (!newState[idxKey]) {
            newState[idxKey] = {
              expanded: false,
              accessibilityId: `job-${job.code}`,
            };
          }
        });
        setAccordionsState(newState);
        setJobsLength(newJobsLength);
      }
    }
  }, [jobs]);

  if (!accordionsInitialized || !accordionsState) return null;

  function handleAccordionClick(accordionIndex: string) {
    if (accordionsState) {
      const foundAccStateItem = accordionsState[accordionIndex];
      if (foundAccStateItem) {
        setAccordionsState({
          ...accordionsState,
          [accordionIndex]: {
            ...foundAccStateItem,
            expanded: foundAccStateItem.expanded === true ? false : true,
          },
        });
      }
    }
  }

  return (
    <ul>
      {jobs.map((job, i) => {
        if (!accordionsState[i]) return null;

        const jobSpecifics = getJobSpecifics(t, accordionsState, jobs, i);
        const { idx, id, isExpanded, locations, jobPath } = jobSpecifics;
        const cls = specialClass.bind(this, accordionsState);

        return (
          <li
            className={`${
              cls(idx).li
            } border border-b-0 border-r-0 border-l-0 border-t-gray-300 py-5`}
            key={i}
          >
            <div className="flex flex-col items-center md:flex-row">
              <div className="flex w-full flex-col md:mr-auto md:w-1/2">
                <h5 className="mb-4">
                  <Link href={jobPath} className="link">
                    {job.title}
                  </Link>
                </h5>
                <h6 className="mb-4">{job.company.department}</h6>
                {job.jobPostedDate && (
                  <span className="text-gray-500">
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }).format(new Date(job.jobPostedDate))}
                  </span>
                )}
              </div>

              <div className="mt-5 w-full md:mt-0 md:w-1/4">
                <span>{locations}</span>
              </div>

              <div className="flex w-full md:ml-auto md:w-1/4">
                <div className="mt-5 flex w-fit md:mt-0 md:ml-auto md:px-5">
                  <Button
                    color="light"
                    aria-controls={id}
                    aria-expanded={isExpanded}
                    onClick={() => handleAccordionClick(idx)}
                    type="button"
                    className=""
                  >
                    <HiStar />
                  </Button>
                </div>
                <div className="ml-auto hidden w-fit md:flex">
                  <Button
                    color="light"
                    aria-controls={id}
                    aria-expanded={isExpanded}
                    onClick={() => handleAccordionClick(idx)}
                    type="button"
                    className=""
                  >
                    <HiChevronDown
                      className={`transition-all ${cls(idx).chevron}`}
                    />
                  </Button>
                </div>
                <div className="mt-5 ml-8 flex items-center md:hidden">
                  <Link href={jobPath} className="link flex items-center">
                    <span className="mr-3">{t("collapse.apply")}</span>
                    <HiLink />
                  </Link>
                </div>
              </div>
            </div>
            <Collapse isOpened={isExpanded}>
              <JobCollapsibleContent id={id} jobPath={jobPath} job={job} />
            </Collapse>
          </li>
        );
      })}
    </ul>
  );
};

// useEffect(() => {
//   if (!accordionsInitialized) {
//     const newState: IAccordionsState = {};
//     jobs.forEach((job, i) => {
//       newState[`${i}`] = {
//         expanded: false,
//         accessibilityId: `job-${job.code}`,
//       };
//     });
//     setAccordionsState(newState);
//     setAccordionsInitialized(true);
//     setTimeout(() => {
//       setJobsJson(JSON.stringify(jobs));
//     }, 0);
//   } else {
//     setTimeout(() => {
//       const newJobsJson = JSON.stringify(jobs);
//       if (jobsJson !== newJobsJson) {
//         const newState: IAccordionsState = { ...accordionsState };
//         jobs.forEach((job, i) => {
//           const idxKey = `${i}`;
//           if (!newState[idxKey]) {
//             console.log("adding new job = ", job);
//             newState[idxKey] = {
//               expanded: false,
//               accessibilityId: `job-${job.code}`,
//             };
//           }
//         });
//         setAccordionsState(newState);
//         setJobsJson(newJobsJson);
//       }
//     }, 0);
//   }
// }, [jobs]);
