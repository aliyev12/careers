import { useFilter } from "@/hooks";
import { countries, USStates } from "@/utils";
import { Button } from "flowbite-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { HiX } from "react-icons/hi";
import { FilterTag } from "./FilterTag";

export const FilterTags: FC = () => {
  const { filters, removeFilter } = useFilter();
  const { t } = useTranslation("common");

  function handleClick(filter: string, item: string) {
    removeFilter(filter, item);
  }

  function tagBtns() {
    const btns: JSX.Element[] = [];

    for (const filter in filters) {
      let filterItems = filters[filter];

      if (Array.isArray(filterItems)) {
        filterItems = filterItems as string[];

        let titles: { [k: string]: string } = {};

        if (filter === "USStates") {
          titles = USStates;
        } else if (filter === "cities") {
          titles = filterItems.reduce((a: { [k: string]: string }, c) => {
            a[c] = c;
            return a;
          }, {});
        } else if (filter === "countries") {
          titles = countries;
        } else {
          titles = filterItems.reduce((a: { [k: string]: string }, c) => {
            a[c] = t(`jobFilter.${filter}.${c}`);
            return a;
          }, {});
        }

        filterItems.forEach((item, i) => {
          const title = titles[item];
          const btn = (
            <FilterTag
              key={`${item}-${i}`}
              handleTagClick={() => handleClick(filter, item)}
              title={title}
            />
          );
          btns.push(btn);
        });
      }
    }
    return btns;
  }

  return <div className="inline-grid grid-cols-3 gap-4">{tagBtns()}</div>;
};
