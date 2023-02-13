import { IJob } from "@/interfaces";
import { truncate } from "@/utils";
import { Button } from "flowbite-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { FC } from "react";
import { HiLink } from "react-icons/hi";
import { getJobTypeBadges } from "./jobsListHelpers";

export const JobCollapsibleContent: FC<{
  id: string;
  jobPath: string;
  job: IJob;
}> = ({ id, jobPath, job }) => {
  const { t } = useTranslation("common");

  return (
    <div className="mt-7 flex flex-col" id={id}>
      <div className="mb-8 flex ">
        <div className="flex w-1/2 flex-col justify-start">
          <Link href={jobPath} className="link flex items-center">
            <span className="mr-3">{t("collapse.see_full_desc")}</span>
            <HiLink />
          </Link>
        </div>
        <div className="flex w-1/2 flex-col space-y-3">
          <div className="flex items-center">
            <span className="mr-3 font-medium">{t("collapse.code")}: </span>
            <span>{job.code}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-3 font-medium">{t("collapse.job_type")}: </span>
            {getJobTypeBadges(t, job.scheduleTypes, job.remoteWorks)}
          </div>
        </div>
      </div>
      <div className="mb-8">
        <p className="leading-7">{truncate(job.summary, 500)}</p>
      </div>
      <div>
        <Button>{t("collapse.apply")}</Button>
      </div>
    </div>
  );
};
