import { useFilter, useJobs } from "@/hooks";
import {
  ICheckboxeOption,
  IJob,
  TFilter,
  TFilterDirect,
  TFilterExpLevel,
  TFilterLocations,
  TFilterRemote,
  TFilterSchedule,
} from "@/interfaces";
import { countries, USStates } from "@/utils";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FilterCheckboxes } from "./FilterCheckboxes";
import {
  extractAvailableLocations,
  extractAvailableJobCats,
  handleCheckboxesChange,
  initCheckboxes,
  updateCheckboxes,
  extractAvailableExpLevels,
  extractAvailableSchedules,
  extractAvailableRemotes,
} from "./filterHelpers";

const FILTERS: { [k: string]: string } = {
  state: "USStates",
  city: "cities",
  country: "countries",
  jobCategory: "jobCategory",
  experienceLevel: "experienceLevel",
  scheduleTypes: "scheduleTypes",
  remoteWorks: "remoteWorks",
};

export const Filter: FC<{
  filter: TFilter;
}> = ({ filter }) => {
  const { t } = useTranslation("common");
  const { filteredJobs: jobs } = useJobs();
  const { updateFilters, filters } = useFilter();
  const [checkboxes, setCheckboxes] = useState<ICheckboxeOption[]>([]);
  const [initialized, setInitialized] = useState(false);

  function extractAvailable(
    _jobs: IJob[],
    _filter: TFilter | TFilterLocations
  ) {
    if (["state", "city", "country"].includes(filter)) {
      return extractAvailableLocations(_jobs, _filter as TFilterLocations);
    } else if (filter === "jobCategory") {
      return extractAvailableJobCats(_jobs, _filter as TFilterDirect);
    } else if (filter === "experienceLevel") {
      return extractAvailableExpLevels(_jobs, _filter as TFilterExpLevel);
    } else if (filter === "scheduleTypes") {
      return extractAvailableSchedules(_jobs, _filter as TFilterSchedule);
    } else if (filter === "remoteWorks") {
      return extractAvailableRemotes(_jobs, _filter as TFilterRemote);
    } else {
      return [];
    }
  }

  // const newAvailableFilterItems = useMemo(
  //   () => extractAvailable(jobs, filter),
  //   [jobs]
  // );
  const newAvailableFilterItems = extractAvailable(jobs, filter);

  function generateCityLabels(cities: string[]) {
    return cities.reduce((a: { [k: string]: string }, c) => {
      a[c] = c;
      return a;
    }, {});
  }

  function generateLabels(items: string[], _filter: string) {
    return items.reduce((a: { [k: string]: string }, c) => {
      a[c] = t(`jobFilter.${_filter}.${c}`);
      return a;
    }, {});
  }

  const labels: { [k: string]: { [n: string]: string } } = {
    state: USStates,
    city: generateCityLabels(newAvailableFilterItems),
    country: countries,
    jobCategory: generateLabels(newAvailableFilterItems, "jobCategory"),
    experienceLevel: generateLabels(newAvailableFilterItems, "experienceLevel"),
    scheduleTypes: generateLabels(newAvailableFilterItems, "scheduleTypes"),
    remoteWorks: generateLabels(newAvailableFilterItems, "remoteWorks"),
  };

  useEffect(() => {
    if (!initialized) {
      const updatedAvailableFilterItems = extractAvailable(jobs, filter);
      // console.log("updatedAvailableFilterItems = jobs", jobs);
      initCheckboxes({
        newAvailableFilterItems: updatedAvailableFilterItems,
        labels: labels[filter],
        setCheckboxOptions: setCheckboxes,
        filter: filters[FILTERS[filter]],
      });
      setInitialized(true);
    } else {
      const updatedAvailableFilterItems = extractAvailable(jobs, filter);
      updateCheckboxes({
        checkboxOptions: checkboxes,
        newAvailableFilterItems: updatedAvailableFilterItems,
        setCheckboxOptions: setCheckboxes,
        labels: labels[filter],
        filterKey: FILTERS[filter],
        filters,
      });
    }
  }, [jobs, filters]);

  if (!checkboxes) return null;

  const handleChange = handleCheckboxesChange.bind(this, {
    checkboxOptions: checkboxes,
    updateFilters,
    setCheckboxOptions: setCheckboxes,
    filter: FILTERS[filter],
  });

  return <FilterCheckboxes options={checkboxes} handleChange={handleChange} />;
};
