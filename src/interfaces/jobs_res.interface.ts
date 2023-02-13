export interface IJobsRes {
  data: TestDatum[];
  meta: Meta;
}

export interface TestDatum {
  id: number;
  attributes: PurpleAttributes;
}

export interface PurpleAttributes {
  status: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  code: string;
  slug: string;
  summary: string;
  description: string;
  aboutTeam: string;
  qualifications: string;
  company: Company;
  additionalSections: AdditionalSection[];
  skillTags: SkillTag[];
  socialMedia: SocialMedia[];
  compensation: Compensation;
  scheduleTypes: ScheduleType[];
  remoteWorks: RemoteWork[];
  localizations: FluffyLocalizations;
  jobPostedDate?: string;
  jobLocations?: Address[];
  jobCategory: string;
  experienceLevel?: SkillTag[];
  education?: SkillTag[];
}

export interface AdditionalSection {
  id: number;
  title: string;
  body: string;
  weight: number;
}

export interface Company {
  data: Data;
}

export interface Data {
  id: number;
  attributes: DataAttributes;
}

export interface DataAttributes {
  name: string;
  department: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  about: string;
  code: string;
  address: Address;
  companyContact: CompanyContact;
  divisions: SkillTag[];
  localizations: PurpleLocalizations;
}

export interface Address {
  id: number;
  city: string;
  state: string;
  country: string;
}

export interface CompanyContact {
  id: number;
  name: string;
  email: string;
  phone: Phone;
}

export interface Phone {
  id: number;
  countryCode: number;
  phoneWithArea: number;
}

export interface SkillTag {
  id: number;
  value: string;
}

export interface PurpleLocalizations {
  data: PurpleDatum[];
}

export interface PurpleDatum {
  id: number;
  attributes: FluffyAttributes;
}

export interface FluffyAttributes {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  about: string;
  code: string;
}

export interface Compensation {
  id: number;
  currency: string;
  frequency: string;
  setAmount: number | null;
  lowestAmount: number | null;
  highestAmount: number | null;
  amountType: string;
}

export interface FluffyLocalizations {
  data: FluffyDatum[];
}

export interface FluffyDatum {
  id: number;
  attributes: TentacledAttributes;
}

export interface TentacledAttributes {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  code: string;
  slug: string;
  summary: string;
  description: string;
  aboutTeam: string;
  qualifications: string;
}

export interface RemoteWork {
  id: number;
  remoteWorkOptions: string;
}

export interface ScheduleType {
  id: number;
  schedule: string;
}

export interface SocialMedia {
  id: number;
  name: string;
  url: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
