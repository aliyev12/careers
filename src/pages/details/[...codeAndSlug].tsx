import { JobsDetails } from "@/components";
import { useCodeAndSlug, useInitContextJobs, useJobs } from "@/hooks";
import { IJobsRes } from "@/interfaces";
import { formatJobs } from "@/utils";
import { GetStaticProps, InferGetStaticPropsType as IInfer } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function JobDetails({ data }: IInfer<typeof getStaticProps>) {
  useInitContextJobs(data);
  const { jobs } = useJobs();

  if (!jobs || !jobs.length) return null;

  return <JobsDetails />;
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
      // Will be passed to the page component as props
    },
  };
};

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const paths: string[] = [];

  for (let i = 0; i < locales.length; i++) {
    const locale = locales[i];
    const url = `${process.env.CMS_ORIGIN}${process.env.CMS_JOBS_PATH}&locale=${locale}`;
    const res: Response = await fetch(url);
    const data: IJobsRes = await res.json();

    for (let j = 0; j < data.data.length; j++) {
      const job = data.data[j];
      const newPath = `${locale === "en" ? "" : "/" + locale}/details/${
        job.attributes.code
      }/${job.attributes.slug}`;
      paths.push(newPath);
    }
  }

  return {
    paths: paths,
    fallback: true,
  };
}

// export default function JobDetails({
//   data,
// }: InferGetStaticPropsType<typeof getStaticProps>) {
//   // const { status, code, slug } = useCodeAndSlug();
//   useInitContextJobs(data);

//   // const router = useRouter();
//   // const { initJobsState, jobsInitialized } = useJobs(formatJobs(data));
//   // const [currentLocale, setCurrentLocale] = useState("en");

//   // useEffect(() => {
//   //   if (data && !jobsInitialized) {
//   //     initJobsState();
//   //   } else if (router.locale !== currentLocale) {
//   //     initJobsState(formatJobs(data));
//   //   }
//   //   setCurrentLocale(router.locale!);
//   // }, [router, router.locale]);

//   // const { codeAndSlug } = router.query;

//   // if (!(codeAndSlug && Array.isArray(codeAndSlug) && codeAndSlug.length === 2))
//   //   return null;

//   // const [code, slug] = codeAndSlug;

//   // if (status === "fail") return null;

//   return <JobsDetails />;
// }
