import { Apply } from "@/components/apply";
import { FormProvider } from "@/context/FormContext";
import { useInitContextJobs, useJobs } from "@/hooks";
import { IJobsRes } from "@/interfaces";
import { GetStaticProps, InferGetStaticPropsType as IInfer } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function ApplyPage({ data }: IInfer<typeof getStaticProps>) {
  useInitContextJobs(data);
  const { jobs } = useJobs();

  if (!jobs || !jobs.length) return null;

  return (
    <FormProvider>
      <Apply />
    </FormProvider>
  );
}

export const getStaticProps: GetStaticProps<{ data: IJobsRes }> = async (
  __props
) => {
  // console.log("__props = ", __props);
  const { locale } = __props;
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

  try {
    for (let i = 0; i < locales.length; i++) {
      const locale = locales[i];
      const url = `${process.env.CMS_ORIGIN}${process.env.CMS_JOBS_PATH}&locale=${locale}`;
      const res: Response = await fetch(url);
      const data: IJobsRes = await res.json();

      for (let j = 0; j < data.data.length; j++) {
        const job = data.data[j];
        const newPath = `${locale === "en" ? "" : "/" + locale}/careers/apply/${
          job.attributes.code
        }/${job.attributes.slug}`;
        paths.push(newPath);
      }
    }
  } catch (error) {
    console.log(error);
  }

  return {
    paths: paths,
    fallback: true,
  };
}
