import { IFilters } from "@/interfaces";
import { log } from "@/utils";
import { useRouter } from "next/router";
import { useFilter } from "./useFilter";

export function useSearchParams() {
  const router = useRouter();
  const { updateFilters } = useFilter();

  function retrieveFilters() {
    // const newFilters: IFilters = {};
    // for (const param in router.query) {
    //   let filter = router.query[param];
    //   if (typeof filter === "string") {
    //     const decoded = decodeURIComponent(filter);
    //     if (param === "search") {
    //       newFilters.keyword = decoded;
    //     } else if (
    //       [
    //         "USStates",
    //         "cities",
    //         "countries",
    //         "jobCategory",
    //         "experienceLevel",
    //         "scheduleTypes",
    //         "remoteWorks",
    //       ].includes(param)
    //     ) {
    //       const split = decoded.split(",");
    //       newFilters[param] = split;
    //     }
    //   } else {
    //     log({ message: "Type of router.query is not a string." });
    //   }
    // }
    // console.log("newFilters = ", newFilters);
    // updateFilters(newFilters);
  }

  function updateSearchParams(filters: IFilters) {
    // let newQuery = { ...router.query };
    // for (const filter in filters) {
    //   if (filter === "keyword") {
    //     // search="developer"
    //     if (filters.keyword.length > 0) {
    //       newQuery = {
    //         ...newQuery,
    //         search: encodeURIComponent(filters.keyword as string),
    //       };
    //     } else {
    //       delete newQuery.search;
    //     }
    //   } else {
    //     if (filters[filter].length > 0) {
    //       newQuery = {
    //         ...newQuery,
    //         [filter]: (filters[filter] as string[])
    //           .map((x) => encodeURIComponent(x))
    //           .join(","),
    //       };
    //     } else {
    //       delete newQuery[filter];
    //     }
    //   }
    // }
    // const existingSearch = newQuery.search;
    // if (existingSearch) {
    //   delete newQuery.search;
    //   const oldParams = { ...newQuery };
    //   newQuery = {};
    //   newQuery.search = existingSearch;
    //   newQuery = {
    //     ...newQuery,
    //     ...oldParams,
    //   };
    // }
    // router.push({
    //   query: newQuery,
    // });
  }

  return { updateSearchParams, retrieveFilters };
}
