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
