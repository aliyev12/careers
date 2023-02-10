import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { UserConfig, useTranslation } from "next-i18next";
import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";
import { IJob } from "@/interfaces";
import Link from "next/link";

export default function Home({
  jobs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation("common");

  return (
    <div>
      {/* <Head>
        <title>Careers</title>
        <meta name="description" content="Careers app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      {/* {jobs.length > 0 &&
        jobs.map((job) => {
          return <div key={`recipe-${job.id}`}>{job.attributes.title}</div>;
        })} */}
      <h1>test</h1>
    </div>
  );
}

export const getStaticProps: GetStaticProps<{ jobs: IJob[] }> = async ({
  locale,
}) => {
  // export async function getServerSideProps({ locale }) {
  const url = `${process.env.CMS_ORIGIN}${process.env.CMS_JOBS_PATH}?locale=${locale}`;
  const res: Response = await fetch(url);
  const data: { data: IJob[] } = await res.json();

  return {
    props: {
      jobs: data.data,
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
