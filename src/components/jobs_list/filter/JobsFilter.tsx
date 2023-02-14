import { useFilter, useJobs, useMatchMedia } from "@/hooks";
import { IAccordionsState } from "@/interfaces";
import { Badge, Button } from "flowbite-react";
import { useTranslation } from "next-i18next";
import { FC, useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { HiCheck, HiChevronDown } from "react-icons/hi";
import { specialClass } from "../jobsListHelpers";
import { CitiesFilter } from "./CitiesFilter";
import { extractAvailableStates } from "./filterHelpers";
import { StatesFilter } from "./StatesFilter";

const IDs = {
  refine: "refine",
  state: "state_filter",
  city: "cities_filter",
};

export const JobsFilter: FC = () => {
  const { jobs } = useJobs();
  const { t } = useTranslation("common");
  const { numOfCheckedStates, numOfCheckedCities } = useFilter();
  const { isDesktop } = useMatchMedia();
  const [accordionsState, setAccordionsState] = useState<IAccordionsState>({
    refine: { expanded: isDesktop, accessibilityId: IDs.refine },
    state_filter: { expanded: false, accessibilityId: IDs.state },
    cities_filter: { expanded: false, accessibilityId: IDs.city },
  });

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
    <div className="mb-8 w-full md:mb-0 md:w-1/3 md:px-5">
      <div className="mb-5 flex items-center justify-between rounded-lg bg-gray-300 py-3 px-5">
        <h5>{t("jobFilter.refine")}</h5>
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
          <li
            className={`border border-r-0 border-l-0 border-t-gray-300 border-b-transparent py-2 last:border-b-gray-300`}
          >
            <button
              aria-controls={IDs.state}
              aria-expanded={isExpanded(IDs.state)}
              onClick={() => handleAccordionClick(IDs.state)}
              type="button"
              className="flex w-full items-center justify-between  py-3 pl-5 pr-4"
            >
              <h6 className="mr-auto">{t("jobFilter.state")}</h6>
              {numOfCheckedStates > 0 && (
                <Badge icon={HiCheck} className="mr-3">
                  {numOfCheckedStates}
                </Badge>
              )}
              <HiChevronDown
                className={`transition-all ${cls(IDs.state).chevron}`}
              />
            </button>
            <Collapse isOpened={isExpanded(IDs.state)}>
              <div className="mt-7 flex flex-col" id={IDs.state}>
                <StatesFilter />
              </div>
            </Collapse>
          </li>
          <li
            className={`border border-r-0 border-l-0 border-t-gray-300 border-b-transparent py-2 last:border-b-gray-300`}
          >
            <button
              aria-controls={IDs.city}
              aria-expanded={isExpanded(IDs.city)}
              onClick={() => handleAccordionClick(IDs.city)}
              type="button"
              className="flex w-full items-center justify-between  py-3 pl-5 pr-4"
            >
              <h6 className="mr-auto">{t("jobFilter.city")}</h6>
              {numOfCheckedCities > 0 && (
                <Badge icon={HiCheck} className="mr-3">
                  {numOfCheckedCities}
                </Badge>
              )}
              <HiChevronDown
                className={`transition-all ${cls(IDs.city).chevron}`}
              />
            </button>
            <Collapse isOpened={isExpanded(IDs.city)}>
              <div className="mt-7 flex flex-col" id={IDs.city}>
                <CitiesFilter />
              </div>
            </Collapse>
          </li>
        </ul>
      </Collapse>
    </div>
  );
};
