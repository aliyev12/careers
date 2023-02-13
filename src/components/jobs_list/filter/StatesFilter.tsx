import { useFilter, useJobs } from "@/hooks";
import { ICheckboxeOption, IJob } from "@/interfaces";
import { USStates } from "@/utils";
import { useTranslation } from "next-i18next";
import React, { FC, useEffect, useMemo, useState } from "react";
import { specialClass } from "../jobsListHelpers";
import { FilterCheckboxes } from "./FilterCheckboxes";
import { extractAvailableStates } from "./filterHelpers";

export const StatesFilter = () => {
  const { jobs } = useJobs();
  const { updateFilters } = useFilter();
  const { t } = useTranslation("common");
  const [statesCheckboxes, setStatesCheckboxes] =
    useState<ICheckboxeOption[]>();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      initStatesCheckboxes();
      setInitialized(true);
    }
  }, [jobs]);

  const newAvailableStates = useMemo(
    () => extractAvailableStates(jobs),
    [jobs]
  );

  function initStatesCheckboxes() {
    const newStatesOptions: ICheckboxeOption[] = [];
    // const newAvailableStates = extractAvailableStates(jobs);
    newAvailableStates.forEach((availableState) => {
      const newStateOption: ICheckboxeOption = {
        id: `${availableState}-option`,
        value: availableState,
        label: USStates[availableState],
        checked: false,
      };
      newStatesOptions.push(newStateOption);
    });
    setStatesCheckboxes(newStatesOptions);
  }

  if (!statesCheckboxes) return null;

  const handleCheckboxesChange = (value: string) => {
    const newStatesCheckboxes = [...statesCheckboxes];
    const foundCheckboxIndex = newStatesCheckboxes
      .map((x) => x.value)
      .indexOf(value);
    if (foundCheckboxIndex !== -1) {
      const prevState = newStatesCheckboxes[foundCheckboxIndex].checked;
      const newState = !prevState;
      newStatesCheckboxes[foundCheckboxIndex].checked = newState;
      const checkedBoxes = newStatesCheckboxes
        .filter((x) => x.checked)
        .map((x) => x.value);
      updateFilters({ USStates: checkedBoxes });
      setStatesCheckboxes(newStatesCheckboxes);
    }
  };

  return (
    <FilterCheckboxes
      options={statesCheckboxes}
      handleChange={handleCheckboxesChange}
    />
  );
};
