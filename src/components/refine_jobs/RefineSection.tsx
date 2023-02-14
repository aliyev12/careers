import { useFilter } from "@/hooks";
import { IFilters, ISpecialClassReturn, TFilter } from "@/interfaces";
import { Badge } from "flowbite-react";
import { useTranslation } from "next-i18next";
import { FC } from "react";
import { Collapse } from "react-collapse";
import { HiCheck, HiChevronDown } from "react-icons/hi";
import { Filter } from "./Filter";
import { IDs } from "./RefineJobs";

export const RefineSection: FC<{
  cls: (accordionIndex: string) => ISpecialClassReturn;
  filter: TFilter;
  handleAccordionClick: (accordionIndex: string) => void;
  isExpanded: (section: string) => boolean;
}> = ({ cls, filter, isExpanded, handleAccordionClick }) => {
  const { t } = useTranslation("common");
  const {
    numOfCheckedStates,
    numOfCheckedCities,
    numOfCheckedCountries,
    numOfCheckedJobCats,
    numOfCheckedExpLevels,
  } = useFilter();

  const numOfCheckedBoxes = {
    state: numOfCheckedStates,
    city: numOfCheckedCities,
    country: numOfCheckedCountries,
    jobCategory: numOfCheckedJobCats,
    experienceLevel: numOfCheckedExpLevels,
  };

  return (
    <li
      className={`border border-r-0 border-l-0 border-t-gray-300 border-b-transparent py-2 last:border-b-gray-300`}
    >
      <button
        aria-controls={IDs[filter]}
        aria-expanded={isExpanded(IDs[filter])}
        onClick={() => handleAccordionClick(IDs[filter])}
        type="button"
        className="flex w-full items-center justify-between  py-3 pl-5 pr-4"
      >
        <h6 className="mr-auto">{t(`jobFilter.${filter}`)}</h6>
        {numOfCheckedBoxes[filter] > 0 && (
          <Badge icon={HiCheck} className="mr-3">
            {numOfCheckedBoxes[filter]}
          </Badge>
        )}
        <HiChevronDown
          className={`transition-all ${cls(IDs[filter]).chevron}`}
        />
      </button>
      <Collapse isOpened={isExpanded(IDs[filter])}>
        <div className="mt-7 flex flex-col" id={IDs[filter]}>
          <Filter filter={filter} />
        </div>
      </Collapse>
    </li>
  );
};
