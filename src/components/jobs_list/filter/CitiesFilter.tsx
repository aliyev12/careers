import { useFilter, useJobs } from "@/hooks";
import { ICheckboxeOption } from "@/interfaces";
import { USStates } from "@/utils";
import { useTranslation } from "next-i18next";
import { useEffect, useMemo, useState } from "react";
import { FilterCheckboxes } from "./FilterCheckboxes";
import {
  extractAvailableCities,
  extractAvailableStates,
  initCheckboxes,
  updateCheckboxes,
} from "./filterHelpers";

export const CitiesFilter = () => {
  const { filteredJobs: jobs } = useJobs();
  const { updateFilters } = useFilter();
  const { t } = useTranslation("common");
  const [citiesCheckboxes, setCitiesCheckboxes] = useState<ICheckboxeOption[]>(
    []
  );
  const [initialized, setInitialized] = useState(false);

  const newAvailableCities = useMemo(
    () => extractAvailableCities(jobs),
    [jobs]
  );

  useEffect(() => {
    if (!initialized) {
      // initStatesCheckboxes();
      initCheckboxes({
        newAvailableFilterItems: newAvailableCities,
        labels: generateCityLabels(newAvailableCities),
        setCheckboxOptions: setCitiesCheckboxes,
      });
      setInitialized(true);
    } else {
      const updatedAvailableCities = extractAvailableCities(jobs);
      updateCheckboxes({
        checkboxOptions: citiesCheckboxes,
        newAvailableFilterItems: updatedAvailableCities,
        setCheckboxOptions: setCitiesCheckboxes,
        labels: generateCityLabels(updatedAvailableCities),
      });
    }
  }, [jobs]);

  function generateCityLabels(cities: string[]) {
    return cities.reduce((a: { [k: string]: string }, c) => {
      a[c] = c;
      return a;
    }, {});
  }

  function initStatesCheckboxes() {
    const newCitiesOptions: ICheckboxeOption[] = [];
    newAvailableCities.forEach((availableCity) => {
      const newStateOption: ICheckboxeOption = {
        id: `${availableCity.replaceAll(" ", "_")}-option`,
        value: availableCity,
        label: availableCity,
        checked: false,
      };
      newCitiesOptions.push(newStateOption);
    });
    setCitiesCheckboxes(newCitiesOptions);
  }

  if (!citiesCheckboxes) return null;

  const handleCheckboxesChange = (value: string) => {
    const newCheckboxes = [...citiesCheckboxes];
    const foundCheckboxIndex = newCheckboxes.map((x) => x.value).indexOf(value);
    if (foundCheckboxIndex !== -1) {
      const prevState = newCheckboxes[foundCheckboxIndex].checked;
      const newState = !prevState;
      newCheckboxes[foundCheckboxIndex].checked = newState;
      const checkedBoxes = newCheckboxes
        .filter((x) => x.checked)
        .map((x) => x.value);
      updateFilters({ cities: checkedBoxes });
      setCitiesCheckboxes(newCheckboxes);
    }
  };

  return (
    <FilterCheckboxes
      options={citiesCheckboxes}
      handleChange={handleCheckboxesChange}
    />
  );
};
