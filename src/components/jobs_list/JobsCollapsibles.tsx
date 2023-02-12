import { ERemoteWork, IJob } from "@/interfaces";
import { Button } from "flowbite-react";
import { useTranslation } from "next-i18next";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useState, useCallback, FC, useEffect } from "react";
import { Collapse } from "react-collapse";
import { HiPlus, HiStar, HiChevronDown } from "react-icons/hi";

interface IAccordionsState {
  [k: string]: { expanded: boolean; accessibilityId: string };
}

export const JobsCollapsibles: FC<{ jobs: IJob[] }> = ({ jobs }) => {
  const { t } = useTranslation("common");
  const [accordionsInitialized, setAccordionsInitialized] = useState(false);
  const [accordionsState, setAccordionsState] = useState<IAccordionsState>();

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
    }
  }, [
    jobs,
    accordionsInitialized,
    accordionsState,
    setAccordionsState,
    setAccordionsInitialized,
  ]);

  const height = 100;

  const [isCheckboxCollapseOpen, setIsCheckboxCollapseOpen] = useState(false);
  const [isButtonCollapseOpen, setIsButtonCollapseOpen] = useState(false);

  // const onChange = useCallback(
  //   ({ target: { checked } }) => setIsCheckboxCollapseOpen(checked),
  //   [setIsCheckboxCollapseOpen]
  // );

  const onClick = useCallback(
    () => setIsButtonCollapseOpen(!isButtonCollapseOpen),
    [isButtonCollapseOpen]
  );

  if (!accordionsInitialized || !accordionsState) return null;

  function specialClass(accordionIndex: string): {
    li: string;
    title: string;
    body: string;
    chevron: string;
  } {
    const expandedClasses = {
      li: "li-expanded",
      title: "rotate-180",
      body: "max-h-60",
      chevron: "rotate-180",
    };
    const collapsedClasses = {
      li: "li-collapsed",
      title: "",
      body: "min-h-0 h-0",
      chevron: "rotate-0",
    };

    if (accordionsState) {
      const foundAccStateItem = accordionsState[accordionIndex];
      if (foundAccStateItem) {
        return foundAccStateItem.expanded === true
          ? expandedClasses
          : collapsedClasses;
      }
    }

    return collapsedClasses;
  }

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

  function getJobSpecifics(i: number) {
    const idx = `${i}`;
    const id = accordionsState![idx].accessibilityId;
    const isExpanded = accordionsState![idx].expanded;
    let locations = "";
    const job = jobs[i];
    if (job.jobLocations && job.jobLocations.length) {
      const firstLocation = job.jobLocations![0];
      if (job.jobLocations.length > 1) {
        const allSameCountry = job.jobLocations.every(
          (j) => j.country === firstLocation.country
        );
        if (allSameCountry) {
          locations = `${t("jobLocations.various")} ${firstLocation.country}`;
        } else {
          const countries = job.jobLocations.map((j) => j.country).join(", ");
          locations = `${t("jobLocations.various")} ${countries}`;
        }
      } else {
        const locationState = firstLocation.state
          ? `${firstLocation.state}, `
          : "";
        locations = `${firstLocation.city}, ${locationState}${firstLocation.country}`;
      }
    } else if (job.remoteWorks) {
      const isFullyRemote = job.remoteWorks.includes(ERemoteWork.fully);
      if (isFullyRemote) {
        locations = t("remoteWorks.fully");
      }
    }

    return { idx, id, isExpanded, locations };
  }

  return (
    <div className="ml-6 w-3/4">
      <ul>
        {jobs.map((job, i) => {
          const { idx, id, isExpanded, locations } = getJobSpecifics(i);
          return (
            <li
              className={`${
                specialClass(idx).li
              } border border-b-0 border-r-0 border-l-0 border-t-gray-300 py-5`}
              key={i}
            >
              <div className="flex items-center">
                <div className=" mr-auto flex w-1/2 flex-col">
                  <h5 className="mb-4">
                    <Link href={`jobs/${job.code}`} className="link">
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

                <div className="w-1/4">
                  <span>{locations}</span>
                </div>

                <div className="ml-auto flex w-1/4">
                  <div className="ml-auto flex w-fit px-5">
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
                  <div className="ml-auto flex w-fit">
                    <Button
                      color="light"
                      aria-controls={id}
                      aria-expanded={isExpanded}
                      onClick={() => handleAccordionClick(idx)}
                      type="button"
                      className=""
                    >
                      <HiChevronDown
                        className={`transition-all ${
                          specialClass(idx).chevron
                        }`}
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <Collapse isOpened={isExpanded}>
                <div
                  // style={{ height }}
                  id={id}
                >
                  {job.description}
                </div>
              </Collapse>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
