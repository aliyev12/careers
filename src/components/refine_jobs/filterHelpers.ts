import {
  ICheckboxeOption,
  IFilters,
  IJob,
  TFilter,
  TFilterDirect,
  TFilterExpLevel,
  TFilterLocations,
  TFilterRemote,
  TFilterSchedule,
} from "@/interfaces";
import { SetStateAction } from "react";

export function extractAvailableLocations(
  jobs: IJob[],
  locationItem: TFilterLocations
) {
  const extractedLocations: string[] = [];
  jobs.forEach((job) => {
    if (job.jobLocations) {
      job.jobLocations.forEach((location) => {
        if (
          location[locationItem] &&
          !extractedLocations.includes(location[locationItem]!)
        ) {
          extractedLocations.push(location[locationItem]!);
        }
      });
    }
  });

  return extractedLocations;
}

export function extractAvailableJobCats(jobs: IJob[], item: TFilterDirect) {
  const extracted: string[] = [];

  jobs.forEach((job) => {
    if (job[item]) {
      extracted.push(job[item]);
    }
  });

  return extracted;
}

export function extractAvailableExpLevels(jobs: IJob[], item: TFilterExpLevel) {
  const extracted: string[] = [];

  jobs.forEach((job) => {
    if (job.experienceLevel) {
      job.experienceLevel.forEach((level) => {
        if (!extracted.includes(level)) {
          extracted.push(level);
        }
      });
    }
  });

  return extracted;
}

export function extractAvailableSchedules(jobs: IJob[], item: TFilterSchedule) {
  const extracted: string[] = [];

  jobs.forEach((job) => {
    if (job.scheduleTypes) {
      job.scheduleTypes.forEach((type) => {
        if (!extracted.includes(type)) {
          extracted.push(type);
        }
      });
    }
  });

  return extracted;
}

export function extractAvailableRemotes(jobs: IJob[], item: TFilterRemote) {
  const extracted: string[] = [];

  jobs.forEach((job) => {
    if (job.remoteWorks) {
      job.remoteWorks.forEach((type) => {
        if (!extracted.includes(type)) {
          extracted.push(type);
        }
      });
    }
  });

  return extracted;
}

interface IChangeCheckboxesProps {
  newAvailableFilterItems: string[];
  setCheckboxOptions: (value: SetStateAction<ICheckboxeOption[]>) => void;
  labels: { [k: string]: string };
  filter?: string | string[];
  filterKey?: string;
}

interface IUpdateCheckboxesProps extends IChangeCheckboxesProps {
  checkboxOptions: ICheckboxeOption[];
  filters: IFilters;
}

export function updateCheckboxes({
  checkboxOptions,
  newAvailableFilterItems,
  setCheckboxOptions,
  labels,
  filterKey,
  filters,
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
    } else {
      const existingCheckbox = newCheckboxOptions[indexOfFound];
      if (!filters[filterKey!].includes(existingCheckbox.value)) {
        newCheckboxOptions[indexOfFound] = {
          ...newCheckboxOptions[indexOfFound],
          checked: false,
        };
      }
    }
  });

  // figure out why when pressing the tag, the list of checkboxes is not updating..

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
  filter,
}: IChangeCheckboxesProps) {
  const newCheckboxOptions: ICheckboxeOption[] = [];
  newAvailableFilterItems.forEach((availableFilterItem) => {
    let checked = false;
    if (filter && filter.includes(availableFilterItem)) {
      checked = filter.includes(availableFilterItem);
    }

    const newOption: ICheckboxeOption = {
      id: `${availableFilterItem}-option`,
      value: availableFilterItem,
      label: labels[availableFilterItem],
      checked,
    };
    newCheckboxOptions.push(newOption);
  });
  newCheckboxOptions.sort((a, b) =>
    a.label > b.label ? 1 : b.label > a.label ? -1 : 0
  );
  setCheckboxOptions(newCheckboxOptions);
}

// (filters: IFilters) => void

interface IHandleCheckboxesChangeProps {
  checkboxOptions: ICheckboxeOption[];
  updateFilters: (filters: IFilters) => void;
  setCheckboxOptions: (value: SetStateAction<ICheckboxeOption[]>) => void;
  filter: string;
}

export const handleCheckboxesChange = (
  {
    checkboxOptions,
    updateFilters,
    setCheckboxOptions,
    filter,
  }: IHandleCheckboxesChangeProps,
  value: string
) => {
  const newCheckboxes = [...checkboxOptions];
  const foundCheckboxIndex = newCheckboxes.map((x) => x.value).indexOf(value);
  if (foundCheckboxIndex !== -1) {
    const prevState = newCheckboxes[foundCheckboxIndex].checked;
    const newState = !prevState;
    newCheckboxes[foundCheckboxIndex].checked = newState;
    const checkedBoxes = newCheckboxes
      .filter((x) => x.checked)
      .map((x) => x.value);
    updateFilters({ [filter]: checkedBoxes });
    setCheckboxOptions(newCheckboxes);
  }
};
