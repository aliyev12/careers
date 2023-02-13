import { ELocale } from "@/interfaces";
import { Avatar, Dropdown } from "flowbite-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { JapanIcon, SpainIcon, USAIcon } from "../common";

export const LangDropdown: FC<{}> = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const currentLang = router.locale!;

  function getIcon(lang?: string) {
    const icon: { [k: string]: JSX.Element } = {
      en: <USAIcon />,
      es: <SpainIcon />,
      ja: <JapanIcon />,
    };
    if (lang) return icon[lang];
    return icon[currentLang];
  }

  return (
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={
        <div className="flex items-center justify-center">
          {getIcon()}
          <span className="hidden md:inline">{t(`${currentLang}.native`)}</span>
        </div>
      }
    >
      <Dropdown.Item>
        <Link
          className="inline-flex items-center"
          href={router.pathname}
          locale="en"
        >
          {getIcon("en")}
          <span>{t("en.native")}</span>{" "}
        </Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link
          className="inline-flex items-center"
          href={router.pathname}
          locale="es"
        >
          {getIcon("es")}
          <span>{t("es.native")}</span>
        </Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link
          href={router.pathname}
          className="inline-flex items-center"
          locale="ja"
        >
          {getIcon("ja")}
          <span>{t("ja.native")}</span>{" "}
        </Link>
      </Dropdown.Item>
    </Dropdown>
  );
};
