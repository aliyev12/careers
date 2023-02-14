import { ICheckboxeOption, IJob } from "@/interfaces";
import { USStates } from "@/utils";
import { SetStateAction } from "react";

export function extractAvailableStates(jobs: IJob[]) {
  const extractedStates: string[] = [];

  jobs.forEach((job) => {
    if (job.jobLocations) {
      job.jobLocations.forEach((location) => {
        if (location.state && !extractedStates.includes(location.state)) {
          extractedStates.push(location.state);
        }
      });
    }
  });

  return extractedStates;
}

export function extractAvailableCities(jobs: IJob[]) {
  const extractedCities: string[] = [];

  jobs.forEach((job) => {
    if (job.jobLocations) {
      job.jobLocations.forEach((location) => {
        if (location.city && !extractedCities.includes(location.city)) {
          extractedCities.push(location.city);
        }
      });
    }
  });

  return extractedCities;
}

interface IChangeCheckboxesProps {
  newAvailableFilterItems: string[];
  setCheckboxOptions: (value: SetStateAction<ICheckboxeOption[]>) => void;
  labels: { [k: string]: string };
}

interface IUpdateCheckboxesProps extends IChangeCheckboxesProps {
  checkboxOptions: ICheckboxeOption[];
}

export function updateCheckboxes({
  checkboxOptions,
  newAvailableFilterItems,
  setCheckboxOptions,
  labels,
}: IUpdateCheckboxesProps) {
  let newCheckboxOptions: ICheckboxeOption[] = [...checkboxOptions];
  newAvailableFilterItems.forEach((availableFilterItem) => {
    const indexOfFound = newCheckboxOptions
      .map((x) => x.value)
      .indexOf(availableFilterItem);
    if (indexOfFound <= -1) {
      const newOption: ICheckboxeOption = {
        id: `${availableFilterItem}-option`,
        value: availableFilterItem,
        label: labels[availableFilterItem],
        checked: false,
      };
      newCheckboxOptions.push(newOption);
    }
  });

  newCheckboxOptions = newCheckboxOptions
    .filter((option) => {
      // console.log("--------");
      // console.log("newAvailableFilterItems = ", newAvailableFilterItems);
      // console.log("option = ", option);
      // console.log("--------");
      const itemIsIncluded = newAvailableFilterItems.includes(option.value);
      if (itemIsIncluded) {
        return true;
      } else {
        // console.log("### removing option = ", option);
        return false;
      }
    })
    .sort((a, b) => (a.label > b.label ? 1 : b.label > a.label ? -1 : 0));
  setCheckboxOptions(newCheckboxOptions);
}

export function initCheckboxes({
  newAvailableFilterItems,
  labels,
  setCheckboxOptions,
}: IChangeCheckboxesProps) {
  const newCheckboxOptions: ICheckboxeOption[] = [];
  newAvailableFilterItems.forEach((availableFilterItem) => {
    const newOption: ICheckboxeOption = {
      id: `${availableFilterItem}-option`,
      value: availableFilterItem,
      label: labels[availableFilterItem],
      checked: false,
    };
    newCheckboxOptions.push(newOption);
  });
  newCheckboxOptions.sort((a, b) =>
    a.label > b.label ? 1 : b.label > a.label ? -1 : 0
  );
  setCheckboxOptions(newCheckboxOptions);
  // setCheckboxOptions(
  //   newCheckboxOptions.sort((a, b) =>
  //     a.label > b.label ? 1 : b.label > a.label ? -1 : 0
  //   )
  // );
}
