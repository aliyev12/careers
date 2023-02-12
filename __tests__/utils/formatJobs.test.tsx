import { EJobScheduleType, EjobStatus, ERemoteWork, IJob } from "@/interfaces";
import { formatJobs } from "@/utils";
import { expect, test } from "vitest";
import jobsResponse from "../__fixtures__/jobsResponse.json";

const exampleJob: IJob = {
  code: "HACOWXH",
  title: "Full Stack Developer",
  slug: "full-stack-developer",
  status: EjobStatus.active,
  company: {
    name: "Dream Coders, LLC",
    department: "Website Modernization Group",
    about: "Really **Awesome** <u>Company</u> ...",
    code: "ABC-en",
    address: {
      city: "Springfield",
      state: "VA",
      country: "USA",
    },
    companyContact: {
      name: "Jane Doe",
      email: "jane.doe@dreamcoders.com",
      phone: {
        countryCode: 1,
        phoneWithArea: 7031234567,
      },
    },
    divisions: ["IT Department", "Website Modernization Group"],
  },
  summary: "test **summary** ",
  description: "do **everything** ",
  aboutTeam: "something **about** the team",
  qualifications: "some **quals**",
  scheduleTypes: [EJobScheduleType.full, EJobScheduleType.part],
  remoteWorks: [ERemoteWork.fully, ERemoteWork.hybrid],
  socialMedia: [
    {
      name: "twitter",
      url: "https://twitter.com/tweeter?lang=en",
    },
    {
      name: "facebook",
      url: "https://www.facebook.com/",
    },
    {
      name: "linkedin",
      url: "https://www.linkedin.com/",
    },
  ],
  compensation: {
    currency: "usd",
    frequency: "annual",
    setAmount: undefined,
    lowestAmount: 8000000,
    highestAmount: 12000000,
    amountType: "range",
  },
  skillTags: ["javascript", "node", "react", "mongo", "css"],
  additionalSections: [
    {
      title: "Section one",
      body: "some desc of the _section_",
      weight: 0,
    },
    {
      title: "Section Two",
      body: "section 2 description ",
      weight: 1,
    },
  ],
};

test("utils/formatJobs", () => {
  // @ts-ignore
  const formattedJobs = formatJobs({
    ...jobsResponse,
    data: [jobsResponse.data[0]],
  });

  expect(formattedJobs).toEqual(
    expect.arrayContaining([expect.objectContaining(exampleJob)])
  );
});
