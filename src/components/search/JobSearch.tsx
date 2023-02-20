import { useFilter } from "@/hooks";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchIcon } from "../common";

export const JobSearch = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { updateFilters } = useFilter();
  const [keyword, setKeyword] = useState("");

  function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (keyword && keyword !== "") {
      updateFilters({ keyword: keyword });
    }

    if (router.pathname === "/") {
      router.push("/careers");
    }
  }

  return (
    <div className="flex w-full flex-col items-start justify-center py-8">
      <div className="flex w-full items-center justify-center">
        <h3>{t("search.title")}</h3>
      </div>
      <div className="mt-8 flex w-full items-center justify-center">
        <form
          method="POST"
          className="w-full md:w-4/5 lg:w-2/3"
          onSubmit={handleSearchSubmit}
        >
          <label
            htmlFor="default-search"
            className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {t("search.search")}
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <SearchIcon />
            </div>
            <input
              type="search"
              id="search-input"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder={t("search.placeholder")!}
              required={true}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {t("search.search")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
