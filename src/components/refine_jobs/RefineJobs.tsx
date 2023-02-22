import { useFilter, useMatchMedia } from "@/hooks";
import { IAccordionsState } from "@/interfaces";
import { retrieveFiltersFromSearchParams } from "@/utils";
import { Button } from "flowbite-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { HiChevronDown, HiXCircle } from "react-icons/hi";
import { specialClass } from "../jobs_list/jobsListHelpers";
import { RefineSection } from "./RefineSection";

export const IDs: { [k: string]: string } = {
  refine: "refine",
  state: "state_filter",
  city: "cities_filter",
  country: "countries_filter",
  jobCategory: "job_category_filter",
  experienceLevel: "experience_level_filter",
  scheduleTypes: "schedule_types_filter",
  remoteWorks: "remote_works_filter",
};

export const RefineJobs: FC = () => {
  const router = useRouter();
  const { setFilters } = useFilter();
  const { t } = useTranslation("common");
  const { isDesktop } = useMatchMedia();
  const [accordionsState, setAccordionsState] = useState<IAccordionsState>({
    refine: { expanded: isDesktop, accessibilityId: IDs.refine },
    state_filter: { expanded: false, accessibilityId: IDs.state },
    cities_filter: { expanded: false, accessibilityId: IDs.city },
    countries_filter: { expanded: false, accessibilityId: IDs.country },
    job_category_filter: { expanded: false, accessibilityId: IDs.jobCategory },
    experience_level_filter: {
      expanded: false,
      accessibilityId: IDs.experienceLevel,
    },
    schedule_types_filter: {
      expanded: false,
      accessibilityId: IDs.scheduleTypes,
    },
    remote_works_filter: {
      expanded: false,
      accessibilityId: IDs.remoteWorks,
    },
  });

  useEffect(() => {
    if (!router.isReady) return;
    const filtersFromUrl = retrieveFiltersFromSearchParams(router.query);
    if (Object.keys(filtersFromUrl).length) {
      setFilters(filtersFromUrl);
    }
  }, [router.isReady]);

  useEffect(() => {
    setAccordionsState({
      ...accordionsState,
      refine: { ...accordionsState.refine, expanded: isDesktop },
    });
  }, [isDesktop]);

  if (!accordionsState) return null;

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

  function isExpanded(section: string) {
    if (!accordionsState) return false;
    return accordionsState[section].expanded;
  }

  const cls = specialClass.bind(this, accordionsState);

  return (
    <>
      <div className="mb-5 flex items-center justify-between  bg-gray-300 py-3 px-5">
        <h5 className="dark:text-gray-800">{t("jobFilter.refine")}</h5>
        <Button
          color="light"
          aria-controls={"id"}
          aria-expanded={accordionsState.refine.expanded}
          onClick={() => handleAccordionClick("refine")}
          type="button"
          className="ml-auto flex md:hidden"
        >
          <HiChevronDown
            className={`transition-all ${cls("refine").chevron}`}
          />
        </Button>
      </div>
      <Collapse isOpened={accordionsState.refine.expanded}>
        <ul id={IDs.refine}>
          <RefineSection
            cls={cls}
            filter={"state"}
            handleAccordionClick={handleAccordionClick}
            isExpanded={isExpanded}
          />
          <RefineSection
            cls={cls}
            filter={"city"}
            handleAccordionClick={handleAccordionClick}
            isExpanded={isExpanded}
          />
          <RefineSection
            cls={cls}
            filter="country"
            handleAccordionClick={handleAccordionClick}
            isExpanded={isExpanded}
          />
          <RefineSection
            cls={cls}
            filter="jobCategory"
            handleAccordionClick={handleAccordionClick}
            isExpanded={isExpanded}
          />
          <RefineSection
            cls={cls}
            filter="experienceLevel"
            handleAccordionClick={handleAccordionClick}
            isExpanded={isExpanded}
          />
          <RefineSection
            cls={cls}
            filter="scheduleTypes"
            handleAccordionClick={handleAccordionClick}
            isExpanded={isExpanded}
          />
          <RefineSection
            cls={cls}
            filter="remoteWorks"
            handleAccordionClick={handleAccordionClick}
            isExpanded={isExpanded}
          />
        </ul>
      </Collapse>
    </>
  );
};
