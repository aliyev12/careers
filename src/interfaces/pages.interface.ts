export enum ELocale {
  en = "en",
  es = "es",
}

export interface IJobCMSAttributes {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: ELocale;
}

export interface IJobCMS {
  id: number;
  attributes: IJobCMSAttributes;
}
