import {
  EEducation,
  EExperienceLevel,
  EJobCategory,
  EJobScheduleType,
  EjobStatus,
  ERemoteWork,
  IAddressBase,
  ICompany,
  IJob,
  IJobSocialMedia,
  IJobsRes,
} from "@/interfaces";
import { AdditionalSection } from "@/interfaces/jobs_res.interface";
import { log } from "./misc";

function n(val: any, newVal: any = null): any {
  if (val === null || val === undefined) return undefined;
  if (newVal) return newVal;
  return val;
}

export function formatJobs(rawData: IJobsRes): IJob[] {
  const jobs: IJob[] = [];

  if (!rawData || !rawData.data || !rawData.data.length) return jobs;

  rawData.data.forEach(({ attributes }) => {
    const {
      code,
      status,
      title,
      slug,
      summary,
      description,
      aboutTeam,
      jobPostedDate,
      qualifications,
      scheduleTypes,
      remoteWorks,
      socialMedia,
      compensation,
      skillTags,
      additionalSections,
      jobLocations,
      jobCategory,
      experienceLevel,
      education,
    } = attributes;

    let company: ICompany | undefined;

    if (attributes.company) {
      const companyAttrs = attributes.company.data.attributes;
      company = {
        name: companyAttrs.name,
        department: companyAttrs.department,
        about: n(companyAttrs.about),
        code: companyAttrs.code,
        address: {
          city: companyAttrs.address.city,
          state: companyAttrs.address.state,
          country: companyAttrs.address.country,
        },
      };

      if (companyAttrs.divisions) {
        company.divisions = n(
          companyAttrs.divisions,
          companyAttrs.divisions.map((d) => d.value)
        );
      }

      if (companyAttrs.companyContact) {
        const phone = companyAttrs.companyContact.phone;
        company.companyContact = n(companyAttrs.companyContact, {
          name: n(companyAttrs.companyContact.name),
          email: n(companyAttrs.companyContact.email),
          phone: n(phone, {
            countryCode: phone.countryCode,
            phoneWithArea: phone.phoneWithArea,
          }),
        });
      }
    }

    if (!company) {
      log({ message: "E-001, Company does not exist for job " + code });
      return jobs;
    }

    const newJob: IJob = {
      code,
      status: status as EjobStatus,
      title,
      slug,
      company,
      summary,
      description,
      jobCategory: jobCategory as EJobCategory,
      aboutTeam: n(aboutTeam),
      jobPostedDate: n(jobPostedDate),
      qualifications: n(qualifications),
    };

    if (additionalSections) {
      newJob.additionalSections = n(
        additionalSections,
        additionalSections
          .map(
            (a) =>
              ({
                title: a.title,
                body: a.body,
                weight: a.weight,
              } as AdditionalSection)
          )
          .sort((a, b) =>
            a.weight > b.weight ? 1 : b.weight > a.weight ? -1 : 0
          )
      );
    }

    if (skillTags) {
      newJob.skillTags = n(
        skillTags,
        skillTags.map((s) => s.value)
      );
    }

    if (experienceLevel) {
      newJob.experienceLevel = n(
        experienceLevel,
        experienceLevel.map((s) => s.value as EExperienceLevel)
      );
    }

    if (education) {
      newJob.education = n(
        education,
        education.map((s) => s.value as EEducation)
      );
    }

    if (compensation) {
      newJob.compensation = n(compensation, {
        currency: compensation.currency,
        frequency: compensation.frequency,
        setAmount: n(compensation.setAmount),
        lowestAmount: compensation.lowestAmount,
        highestAmount: compensation.highestAmount,
        amountType: compensation.amountType,
      });
    }

    if (scheduleTypes) {
      newJob.scheduleTypes = n(
        scheduleTypes,
        scheduleTypes.map((s) => s.schedule as EJobScheduleType)
      );
    }

    if (jobLocations) {
      newJob.jobLocations = n(
        jobLocations,
        jobLocations.map(
          (j) =>
            ({
              city: j.city,
              state: j.state,
              country: j.country,
            } as IAddressBase)
        )
      );
    }
    if (remoteWorks) {
      newJob.remoteWorks = n(
        remoteWorks,
        remoteWorks.map((r) => r.remoteWorkOptions as ERemoteWork)
      );
    }
    if (socialMedia) {
      newJob.socialMedia = n(
        socialMedia,
        socialMedia.map(
          (s) => ({ name: s.name, url: s.url } as IJobSocialMedia)
        )
      );
    }

    jobs.push(newJob);
  });

  return jobs;
}
