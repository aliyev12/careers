import { useCodeAndSlug, useFilter, useJobs } from "@/hooks";
import { log, updateFiltersSearchParams } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { HiChevronLeft } from "react-icons/hi";
import { stringify } from "querystring";
import { Button } from "flowbite-react";
import { DetailsSection } from "./DetailsSection";
import { QuickFacts } from "./QuickFacts";

export const JobsDetails: FC = () => {
  const { jobs } = useJobs();
  const { status, code, slug } = useCodeAndSlug();
  const { t } = useTranslation();
  const { filters } = useFilter();

  if (status === "fail") return null;

  function buildBackPageUrl() {
    const filterParamsObj = updateFiltersSearchParams(filters);
    const filterParamsStr = stringify(filterParamsObj);
    return `/careers?${filterParamsStr}`;
  }

  const job = jobs.find((j) => j.code === code && j.slug === slug);

  if (!job) {
    log({
      message: `Job with code "${code}" and slug "${slug}" wasn't found.`,
    });
    return null;
  }

  console.log("job = ", job);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="my-8 flex w-full justify-center">
        <h1>{job.title}</h1>
      </div>
      {job.jobLocations && (
        <div className="flex justify-center">
          <span className="text-xl font-medium">
            {job.jobLocations[0].city}, {job.jobLocations[0].state},{" "}
            {job.jobLocations[0].country}
          </span>
        </div>
      )}
      <div className="mt-5 mb-8 flex w-full items-center justify-center">
        <span className="mr-2">{t("details.code")}:</span>
        <span>{job.code}</span>
      </div>
      <div className="mt-5 mb-8 flex w-full items-center justify-center">
        <Link
          href={`/careers/apply/${job.code}/${job.slug}`}
          className="mr-2 mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {t("details.apply")}
        </Link>
      </div>
      <div className="mt-5 mb-8 flex w-full items-center justify-center">
        <Link href={buildBackPageUrl()} className="link flex items-center">
          <HiChevronLeft className="mr-1" />
          {t("details.back_to_results")}
        </Link>
      </div>

      <QuickFacts {...job} />

      <DetailsSection title={t("details.summary")} body={job.summary} />
      {job.aboutTeam && (
        <DetailsSection title={t("details.team")} body={job.aboutTeam} />
      )}
      {job.description && (
        <DetailsSection
          title={t("details.description")}
          body={job.description}
        />
      )}
      {job.qualifications && (
        <DetailsSection
          title={t("details.qualifications")}
          body={job.qualifications}
        />
      )}
      {job.additionalSections &&
        job.additionalSections.map((section, i) => {
          return (
            <DetailsSection title={section.title} body={section.body} key={i} />
          );
        })}

      <div>
        <div>Code: {code}</div>
        <div>Slug: {slug}</div>
      </div>
    </div>
  );
};
