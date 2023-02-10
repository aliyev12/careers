import { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

export default function Contact(
  _props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { t } = useTranslation("common");

  return (
    <div>
      <Head>
        <title>Careers - {t("nav_links.contact")}</title>
      </Head>
      <h1>Contact Page</h1>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  // export async function getServerSideProps({ locale }) {
  const url = `${process.env.CMS_ORIGIN}${process.env.CMS_JOBS_PATH}?locale=${locale}`;
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
