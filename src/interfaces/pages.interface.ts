export enum ELocale {
  en = "en",
  es = "es",
}

export interface IJobAttributes {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: ELocale;
}

export interface IJob {
  id: number;
  attributes: IJobAttributes;
}
