export interface IJob {
  code: string;
  status: EjobStatus;
  title: string;
  slug: string;
  company: ICompany;
  summary: string;
  description: string;
  aboutTeam?: string;
  qualifications?: string;
  scheduleTypes?: EJobScheduleType[];
  remoteWorks?: ERemoteWork[];
  socialMedia?: IJobSocialMedia[];
  compensation?: ICompensation;
  skillTags?: string[];
  additionalSections?: IAdditionalSection[];
  jobPostedDate?: string;
  jobLocations?: IAddressBase[];
  jobCategory: EJobCategory;
  experienceLevel?: EExperienceLevel[];
  education?: EEducation[];
}

export enum EJobCategory {
  full_stack = "full_stack",
  front_end = "front_end",
  back_end = "back_end",
  dev_ops = "dev_ops",
  ui_ux = "ui_ux",
  content = "content",
  other = "other",
}

export enum EExperienceLevel {
  entry = "entry",
  mid = "mid",
  senior = "senior",
  none = "",
}

export enum EEducation {
  high_school = "high_school",
  associates = "associates",
  bachelors = "bachelors",
  masters = "masters",
  doctoral = "doctoral",
  none = "none",
}

export enum EjobStatus {
  active = "active",
  inactive = "inactive",
  soon = "soon",
}

export interface ICompany {
  name: string;
  department: string;
  address: IAddressBase;
  divisions?: string[];
  about?: string;
  companyContact?: ICompanyContact;
  code: string;
}

export interface IAddressBase {
  country: string;
  city: string;
  state?: string;
}

export interface ICompanyContact {
  name?: string;
  phone?: IPhone;
  email?: string;
}

export interface IPhone {
  countryCode: number;
  phoneWithArea: number;
}

export interface IAdditionalSection {
  title: string;
  body: string;
  weight: number;
}

export enum EJobScheduleType {
  full = "full",
  part = "part",
}

export enum ERemoteWork {
  fully = "fully",
  hybrid = "hybrid",
  none = "none",
}

export interface IJobSocialMedia {
  name: "facebook" | "instagram" | "linkedin" | "twitter" | string;
  url: string;
}

export interface ICompensation {
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
