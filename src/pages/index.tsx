import { Home } from "@/components";
import { useInitContextJobs } from "@/hooks";
import { IJobsRes } from "@/interfaces";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function HomePage({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { jobs, jobsInitialized } = useInitContextJobs(data);

  if (!jobs || !jobs.length) return null;

  return <div className="w-full">{jobsInitialized && <Home />}</div>;
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

// const router = useRouter();
// const { initJobsState, jobsInitialized } = useJobs(formatJobs(data));
// const [currentLocale, setCurrentLocale] = useState("en");
// const { t } = useTranslation("common");

// useEffect(() => {
//   if (data && !jobsInitialized) {
//     initJobsState();
//   } else if (router.locale !== currentLocale) {
//     initJobsState(formatJobs(data));
//   }
//   setCurrentLocale(router.locale!);
// }, [router, router.locale]);
