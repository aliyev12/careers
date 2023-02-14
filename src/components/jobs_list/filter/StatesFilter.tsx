import { useFilter, useJobs } from "@/hooks";
import { ICheckboxeOption } from "@/interfaces";
import { USStates } from "@/utils";
import { useEffect, useMemo, useState } from "react";
import { FilterCheckboxes } from "./FilterCheckboxes";
import {
  extractAvailableStates,
  initCheckboxes,
  updateCheckboxes,
} from "./filterHelpers";

export const StatesFilter = () => {
  const { filteredJobs: jobs } = useJobs();
  const { updateFilters } = useFilter();
  const [statesCheckboxes, setStatesCheckboxes] = useState<ICheckboxeOption[]>(
    []
  );
  const [initialized, setInitialized] = useState(false);

  const newAvailableStates = useMemo(
    () => extractAvailableStates(jobs),
    [jobs]
  );

  useEffect(() => {
    if (!initialized) {
      initCheckboxes({
        newAvailableFilterItems: newAvailableStates,
        labels: USStates,
        setCheckboxOptions: setStatesCheckboxes,
      });
      setInitialized(true);
    } else {
      const updatedAvailableStates = extractAvailableStates(jobs);
      updateCheckboxes({
        checkboxOptions: statesCheckboxes,
        newAvailableFilterItems: updatedAvailableStates,
        setCheckboxOptions: setStatesCheckboxes,
        labels: USStates,
      });
    }
  }, [jobs]);

  // function initStatesCheckboxes() {
  //   const newStatesOptions: ICheckboxeOption[] = [];
  //   // const newAvailableStates = extractAvailableStates(jobs);
  //   newAvailableStates.forEach((availableState) => {
  //     const newStateOption: ICheckboxeOption = {
  //       id: `${availableState}-option`,
  //       value: availableState,
  //       label: USStates[availableState],
  //       checked: false,
  //     };
  //     newStatesOptions.push(newStateOption);
  //   });
  //   setStatesCheckboxes(newStatesOptions);
  // }

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
