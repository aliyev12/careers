import { ICompensation, IJob } from "@/interfaces";
import { Badge, Card } from "flowbite-react";
import { useRouter } from "next/router";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const Fact: FC<{ name: string; items: string[] }> = ({
  name,
  items,
}) => {
  return (
    <div>
      <span className="font-semibold">{name}</span>:{" "}
      <span>{items.join(", ")}</span>
    </div>
  );
};

interface IICompensation {
  currency: "usd" | "eur" | "jpy" | "mxn" | string;
  frequency:
    | "hourly"
    | "weekly"
    | "monthly"
    | "bi-monthly"
    | "annual"
    | "other"
    | string;
  setAmount?: number;
  amountType: "set" | "range" | string;
  lowestAmount?: number;
  highestAmount?: number;
}

export function currencyFormatter(currency: string, amount: number): string {
  const mapper: { [k: string]: (n: number) => string } = {
    usd: (num: number) => {
      const dollars = (num / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });

      return dollars;
    },
    // eur: "", // // TODO : add all the rest of the currency formats
    // jpy: "",
    // mxn: "",
  };
  if (!Object.keys(mapper).includes(currency)) return `${amount}`;
  return mapper[currency](amount);
}

export const COMP_FREQUENCIES = [
  "hourly",
  "weekly",
  "monthly",
  "bi-monthly",
  "annual",
];

export const Compensation: FC<ICompensation> = ({
  amountType,
  currency,
  frequency,
  highestAmount,
  lowestAmount,
  setAmount,
}) => {
  const { t } = useTranslation("common");

  function getCompensationValue(): string {
    const setAmountExists = () => setAmount !== undefined || setAmount !== null;
    const rangeValsExist = () =>
      (lowestAmount !== undefined || lowestAmount !== null) &&
      (highestAmount !== undefined || highestAmount !== null);

    const generateFromTo = (l: string, h: string) =>
      t("details.from_to_amount_range")
        .replace("{{lowest_amount}}", l)
        .replace("{{highest_amount}}", h);

    const addFrequency = (amnt: string) => {
      if (frequency === "other" || !COMP_FREQUENCIES.includes(frequency))
        return "";
      return t(`details.compensationFrequency.${frequency}`).replace(
        "{{amount}}",
        amnt
      );
    };

    if (amountType === "set" && setAmountExists()) {
      const formattedCurrency = currencyFormatter(currency, setAmount!);
      return addFrequency(formattedCurrency);
    } else if (amountType === "range") {
      const fromTo = generateFromTo(
        currencyFormatter(currency, lowestAmount!),
        currencyFormatter(currency, highestAmount!)
      );
      return addFrequency(fromTo);
    } else {
      if (setAmountExists()) return `${setAmount}`;
      if (rangeValsExist()) {
        const fromTo = generateFromTo(`${lowestAmount}`, `${highestAmount}`);
        return addFrequency(fromTo);
      }
    }
    return "none";
  }

  const compensationValue = getCompensationValue();

  if (compensationValue === "none") return null;

  return (
    <div>
      <span className="font-semibold">{t("details.compensation")}</span>:{" "}
      <span>{compensationValue}</span>
    </div>
  );
};

export const QuickFacts: FC<IJob> = ({
  scheduleTypes,
  remoteWorks,
  education,
  experienceLevel,
  jobCategory,
  skillTags,
  jobPostedDate,
  compensation,
}) => {
  const { t } = useTranslation("common");
  const { locale } = useRouter();

  function getDate() {
    if (jobPostedDate && locale) {
      const locales: { [k: string]: string } = {
        en: "en-US",
        es: "es-ES",
        ja: "ja-JP",
      };
      return new Intl.DateTimeFormat(locales[locale], {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(jobPostedDate));
    }
    return "";
  }

  return (
    <article className="mt-5 mb-8 ">
      <h3 className="mb-5">{t("details.facts")}</h3>
      <Card>
        {jobPostedDate && (
          <div>
            <span className="font-semibold">{`Job posted on`}</span>:{" "}
            <span>{getDate()}</span>
          </div>
        )}
        {scheduleTypes && (
          <Fact
            name={t("details.employment_type")}
            items={scheduleTypes.map((x) => t(`scheduleTypes.${x}`))}
          />
        )}
        {remoteWorks && (
          <Fact
            name={t("details.remote")}
            items={remoteWorks.map((x) => t(`remoteWorks.${x}`))}
          />
        )}
        {education && (
          <Fact
            name={t("details.education")}
            items={education.map((x) => t(`education.${x}`))}
          />
        )}
        {experienceLevel && (
          <Fact
            name={t("details.experienceLevel")}
            items={experienceLevel.map((x) => t(`experienceLevel.${x}`))}
          />
        )}
        {compensation && <Compensation {...compensation} />}
        <div className="flex">
          <div className="inline-grid grid-cols-4 gap-4">
            <Badge color="indigo">{t(`jobCategory.${jobCategory}`)}</Badge>
            {skillTags &&
              skillTags.map((tag, i) => (
                <Badge color="info" key={i}>
                  {t(`skillTags.${tag}`)}
                </Badge>
              ))}
          </div>
        </div>
      </Card>
    </article>
  );
};
