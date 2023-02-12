import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserConfig, useTranslation } from "next-i18next";
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";
import { IJob, IJobsRes } from "@/interfaces";
import Link from "next/link";
import { useJobs } from "@/hooks";
import { useEffect } from "react";
import { JobsList } from "@/components";
import { formatJobs } from "@/utils";

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { initJobsState, jobsInitialized } = useJobs(formatJobs(data));
  const { t } = useTranslation("common");

  useEffect(() => {
    if (data && !jobsInitialized) {
      initJobsState();
    }
  }, []);

  return <div className="w-full">{jobsInitialized && <JobsList />}</div>;
}

export const getStaticProps: GetStaticProps<{ data: IJobsRes }> = async ({
  locale,
}) => {
  // export async function getServerSideProps({ locale }) {
  const url = `${process.env.CMS_ORIGIN}${process.env.CMS_JOBS_PATH}&locale=${locale}`;
  const res: Response = await fetch(url);
  const data: IJobsRes = await res.json();

  return {
    props: {
      data,
      ...(await serverSideTranslations(locale!, ["common"])),
      // Will be passed to the page component as props
    },
  };
};

// <Image
// src="/vercel.svg"
// alt="Vercel Logo"
// className={styles.vercelLogo}
// width={100}
// height={24}
// priority
// />

// <Image
// className={styles.logo}
// src="/next.svg"
// alt="Next.js Logo"
// width={180}
// height={37}
// priority
// />
// <div className={styles.thirteen}>
// <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
