import { JobsList } from "@/components";
import { useInitContextJobs } from "@/hooks";
import { IJobsRes } from "@/interfaces";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { jobs, jobsInitialized } = useInitContextJobs(data);

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
