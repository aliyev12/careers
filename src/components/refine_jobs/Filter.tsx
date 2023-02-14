import { useFilter, useJobs } from "@/hooks";
import {
  ICheckboxeOption,
  IJob,
  TFilter,
  TFilterDirect,
  TFilterExpLevel,
  TFilterLocations,
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
} from "./filterHelpers";

const FILTERS: { [k: string]: string } = {
  state: "USStates",
  city: "cities",
  country: "countries",
  jobCategory: "jobCategory",
  experienceLevel: "experienceLevel",
};

export const Filter: FC<{
  filter: TFilter;
}> = ({ filter }) => {
  const { t } = useTranslation("common");
  const { filteredJobs: jobs } = useJobs();
  const { updateFilters } = useFilter();
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
    } else {
      return [];
    }
  }

  const newAvailableFilterItems = useMemo(
    () => extractAvailable(jobs, filter),
    [jobs]
  );

  function generateCityLabels(cities: string[]) {
    return cities.reduce((a: { [k: string]: string }, c) => {
      a[c] = c;
      return a;
    }, {});
  }

  function generateJobCatLabels(jobCats: string[]) {
    return jobCats.reduce((a: { [k: string]: string }, c) => {
      a[c] = t(`jobFilter.${c}`);
      return a;
    }, {});
  }

  function generateExpLevelLabels(jobCats: string[]) {
    return jobCats.reduce((a: { [k: string]: string }, c) => {
      a[c] = t(`jobFilter.${c}`);
      return a;
    }, {});
  }

  const labels: { [k: string]: { [n: string]: string } } = {
    state: USStates,
    city: generateCityLabels(newAvailableFilterItems),
    country: countries,
    jobCategory: generateJobCatLabels(newAvailableFilterItems),
    experienceLevel: generateExpLevelLabels(newAvailableFilterItems),
  };

  useEffect(() => {
    if (!initialized) {
      initCheckboxes({
        newAvailableFilterItems: newAvailableFilterItems,
        labels: labels[filter],
        setCheckboxOptions: setCheckboxes,
      });
      setInitialized(true);
    } else {
      const updatedAvailableFilterItems = extractAvailable(jobs, filter);
      updateCheckboxes({
        checkboxOptions: checkboxes,
        newAvailableFilterItems: updatedAvailableFilterItems,
        setCheckboxOptions: setCheckboxes,
        labels: labels[filter],
      });
    }
  }, [jobs]);

  if (!checkboxes) return null;

  const handleChange = handleCheckboxesChange.bind(this, {
    checkboxOptions: checkboxes,
    updateFilters,
    setCheckboxOptions: setCheckboxes,
    filter: FILTERS[filter],
  });

  return <FilterCheckboxes options={checkboxes} handleChange={handleChange} />;
};
