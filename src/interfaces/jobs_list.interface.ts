export interface IAccordionsState {
  [k: string]: { expanded: boolean; accessibilityId: string };
}

export interface ICheckboxeOption {
  id: string;
  label: string;
  value: string;
  checked: boolean;
}

export interface ISpecialClassReturn {
  li: string;
  title: string;
  body: string;
  chevron: string;
}

export type TFilterLocations = "state" | "city" | "country";
export type TFilterDirect = "jobCategory";
export type TFilterExpLevel = "experienceLevel";
export type TFilter =
  | "state"
  | "city"
  | "country"
  | "jobCategory"
  | "experienceLevel";
