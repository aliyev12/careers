import { JobsList } from "@/components";
import { useInitContextJobs } from "@/hooks";
import { IJobsRes } from "@/interfaces";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CareersPage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { jobs, jobsInitialized } = useInitContextJobs(data);

  useEffect(() => {
    if (!router.isReady) return;

    if (!Object.keys(router.query).length) {
      router.push({ query: { ...router.query, countries: "US" } });
    }
  }, [router.isReady]);

  if (!jobs || !jobs.length) return null;

  return <div className="w-full">{jobsInitialized && <JobsList />}</div>;
}

export const getStaticProps: GetStaticProps<{ data: IJobsRes }> = async ({
  locale,
}) => {
  const url = `${process.env.CMS_ORIGIN}${process.env.CMS_JOBS_PATH}&locale=${locale}`;
  const res: Response = await fetch(url);
  const data: IJobsRes = await res.json();

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
