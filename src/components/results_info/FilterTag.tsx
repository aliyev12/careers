import { Button } from "flowbite-react";
import { FC } from "react";
import { HiX } from "react-icons/hi";

export const FilterTag: FC<{
  handleTagClick: (e: any) => void;
  title: string;
}> = ({ title, handleTagClick }) => {
  return (
    <Button color="light" className="" onClick={handleTagClick}>
      <span className="ml-[3px] whitespace-nowrap">{title}</span>
      <HiX className="ml-2 h-5 w-5" />
    </Button>
  );
};
