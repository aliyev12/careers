import { IFilters } from "@/interfaces";
import { log } from "@/utils";
import { ParsedUrlQuery } from "querystring";

export function retrieveFiltersFromSearchParams(query: ParsedUrlQuery) {
  const newFilters: IFilters = {};
  for (const param in query) {
    let filter = query[param];
    if (typeof filter === "string") {
      const decoded = decodeURIComponent(filter);
      if (param === "search") {
        newFilters.keyword = decoded;
      } else if (
        [
          "USStates",
          "cities",
          "countries",
          "jobCategory",
          "experienceLevel",
          "scheduleTypes",
          "remoteWorks",
        ].includes(param)
      ) {
        const split = decoded.split(",");
        newFilters[param] = split;
      }
    } else {
      log({ message: "Type of router.query is not a string." });
    }
  }
  return newFilters;
}

export function updateFiltersSearchParams(
  filters: IFilters,
  query: ParsedUrlQuery = {}
) {
  let newQuery = { ...query };
  for (const filter in filters) {
    if (filter === "keyword") {
      if (filters.keyword.length > 0) {
        newQuery = {
          ...newQuery,
          search: encodeURIComponent(filters.keyword as string),
        };
      } else {
        delete newQuery.search;
      }
    } else {
      if (filters[filter].length > 0) {
        newQuery = {
          ...newQuery,
          [filter]: (filters[filter] as string[])
            .map((x) => encodeURIComponent(x))
            .join(","),
        };
      } else {
        delete newQuery[filter];
      }
    }
  }
  const existingSearch = newQuery.search;
  if (existingSearch) {
    delete newQuery.search;
    const oldParams = { ...newQuery };
    newQuery = {};
    newQuery.search = existingSearch;
    newQuery = {
      ...newQuery,
      ...oldParams,
    };
  }

  return newQuery;
}
