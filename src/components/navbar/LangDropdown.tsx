import { Avatar, Dropdown } from "flowbite-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { USAIcon } from "../icons";

export const LangDropdown: FC<{}> = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const currentLang = router.locale!;

  return (
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={
        <div className="flex items-center justify-center">
          <USAIcon />
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
          <USAIcon />
          <span>{t("en.native")}</span>{" "}
        </Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link
          className="inline-flex items-center"
          href={router.pathname}
          locale="es"
        >
          <USAIcon />
          <span>{t("es.native")}</span>
        </Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link
          href={router.pathname}
          className="inline-flex items-center"
          locale="ja"
        >
          <USAIcon />
          <span>{t("ja.native")}</span>{" "}
        </Link>
      </Dropdown.Item>
    </Dropdown>
  );
};
