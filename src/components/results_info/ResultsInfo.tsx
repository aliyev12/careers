import { useFilter } from "@/hooks";
import { countries, truncate, USStates } from "@/utils";
import { Button } from "flowbite-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { HiShoppingCart, HiX } from "react-icons/hi";
import { FilterTag } from "./FilterTag";
import { FilterTags } from "./FilterTags";

export const ResultsInfo: FC = () => {
  const { filters, totalNumOfFilters, filteredJobs, removeFilter } =
    useFilter();
  const { t } = useTranslation("common");
  const keyword = filters.keyword;

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between">
        {keyword && (
          <div className="flex items-center">
            <span className="mr-3">{t("resultsInfo.searched_for")}</span>
            <FilterTag
              handleTagClick={() => removeFilter("keyword", "")}
              title={`"${truncate(keyword as string, 15, "chars")}"`}
            />
          </div>
        )}
        {totalNumOfFilters > 0 && (
          <span>
            {totalNumOfFilters}{" "}
            {totalNumOfFilters === 1
              ? t("resultsInfo.filter")
              : t("resultsInfo.filters")}
          </span>
        )}
      </div>
      <div className="my-5 flex flex-wrap">
        <FilterTags />
      </div>
      <div>
        <span>
          {filteredJobs.length} job{filteredJobs.length === 1 ? "" : "s"}
        </span>
      </div>
    </div>
  );
};
