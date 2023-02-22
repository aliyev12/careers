import {
  EJobScheduleType,
  ERemoteWork,
  IAccordionsState,
  IJob,
  ISpecialClassReturn,
} from "@/interfaces";
import { Badge } from "flowbite-react";
import { TFunction } from "next-i18next";

export function getJobSpecifics(
  t: TFunction,
  accordionsState: IAccordionsState,
  jobs: IJob[],
  i: number
) {
  const idx = `${i}`;
  const id = accordionsState![idx].accessibilityId;
  const isExpanded = accordionsState![idx].expanded;
  let locations = "";
  const job = jobs[i];
  const jobPath = `/careers/details/${job.code}/${job.slug}`;
  if (job.jobLocations && job.jobLocations.length) {
    const firstLocation = job.jobLocations![0];
    if (job.jobLocations.length > 1) {
      const allSameCountry = job.jobLocations.every(
        (j) => j.country === firstLocation.country
      );
      if (allSameCountry) {
        locations = `${t("jobLocations.various")} ${firstLocation.country}`;
      } else {
        const countries = job.jobLocations.map((j) => j.country).join(", ");
        locations = `${t("jobLocations.various")} ${countries}`;
      }
    } else {
      const locationState = firstLocation.state
        ? `${firstLocation.state}, `
        : "";
      locations = `${firstLocation.city}, ${locationState}${firstLocation.country}`;
    }
  } else if (job.remoteWorks) {
    const isFullyRemote = job.remoteWorks.includes(ERemoteWork.fully);
    if (isFullyRemote) {
      locations = t("remoteWorks.fully");
    }
  }

  return { idx, id, isExpanded, locations, jobPath };
}

export function specialClass(
  accordionsState: IAccordionsState,
  accordionIndex: string
): ISpecialClassReturn {
  const expandedClasses = {
    li: "li-expanded",
    title: "rotate-180",
    body: "max-h-60",
    chevron: "rotate-180",
  };
  const collapsedClasses = {
    li: "li-collapsed",
    title: "",
    body: "min-h-0 h-0",
    chevron: "rotate-0",
  };

  if (accordionsState) {
    const foundAccStateItem = accordionsState[accordionIndex];
    if (foundAccStateItem) {
      return foundAccStateItem.expanded === true
        ? expandedClasses
        : collapsedClasses;
    }
  }

  return collapsedClasses;
}

export function getJobTypeBadges(
  t: TFunction,
  scheduleTypes?: EJobScheduleType[],
  remoteWorks?: ERemoteWork[]
): JSX.Element {
  const badges: JSX.Element[] = [];

  const mappers = {
    full: t("scheduleTypes.full"),
    part: t("scheduleTypes.part"),
    fully: t("remoteWorks.fully"),
    hybrid: t("remoteWorks.hybrid"),
    none: t("remoteWorks.none"),
  };

  if (scheduleTypes && scheduleTypes.length) {
    scheduleTypes.forEach((s, i) => {
      badges.push(
        <Badge color="info" key={mappers[s]}>
          {mappers[s]}
        </Badge>
      );
    });
  }

  if (remoteWorks && remoteWorks.length) {
    remoteWorks.forEach((r, j) => {
      badges.push(
        <Badge color="indigo" key={mappers[r]}>
          {mappers[r]}
        </Badge>
      );
    });
  }

  return <div className="flex flex-wrap items-center space-x-3">{badges}</div>;
}
