import { ICheckboxeOption } from "@/interfaces";
import { Checkbox, Label } from "flowbite-react";
import { FC } from "react";

export const FilterCheckboxes: FC<{
  options: ICheckboxeOption[];
  handleChange: (value: string) => void;
}> = ({ handleChange, options }) => {
  return (
    <div className="flex flex-col gap-4 px-5">
      {options.map(({ id, label, value, checked }) => {
        return (
          <div className="flex items-center gap-2" key={id}>
            <Checkbox
              id={id}
              // defaultChecked={true}
              value={value}
              onChange={() => handleChange(value)}
              checked={checked}
              className="cursor-pointer"
            />
            <Label htmlFor={id}>{label}</Label>
          </div>
        );
      })}
    </div>
  );
};
