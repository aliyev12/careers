export interface IAccordionsState {
  [k: string]: { expanded: boolean; accessibilityId: string };
}

export interface ICheckboxeOption {
  id: string;
  label: string;
  value: string;
  checked: boolean;
}
