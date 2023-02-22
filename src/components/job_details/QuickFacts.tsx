import { ICompensation, IJob } from "@/interfaces";
import { Badge, Card } from "flowbite-react";
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

export const Compensation: FC<ICompensation> = ({}) => {
  return (
    <div>
      {/* <span className="font-semibold">{name}</span>:{" "}
      <span>{items.join(", ")}</span> */}
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
}) => {
  const { t } = useTranslation();

  return (
    <article className="mt-5 mb-8 ">
      <h3 className="mb-5">Quick facts</h3>
      <Card>
        {jobPostedDate && (
          <div>
            <span className="font-semibold">{`Job posted on`}</span>:{" "}
            <span>{new Date(jobPostedDate).toLocaleDateString()}</span>
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
