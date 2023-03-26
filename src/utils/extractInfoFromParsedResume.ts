import { EAPIStatus } from "./api";

export interface IExtractedInfoItem {
  status: EAPIStatus;
  value?: string;
}

export interface IExtractedInfoResult {
  [k: string]: IExtractedInfoItem;
}

export function extractInfoFromParsedResume(parsedResume: {
  [k: string]: any;
}): IExtractedInfoResult {
  const result: IExtractedInfoResult = {
    firstName: {
      status: EAPIStatus.fail,
      value: undefined,
    },
    lastName: {
      status: EAPIStatus.fail,
      value: undefined,
    },
    email: {
      status: EAPIStatus.fail,
      value: undefined,
    },
    phone: {
      status: EAPIStatus.fail,
      value: undefined,
    },
  };

  if (!parsedResume) return result;

  if (parsedResume.name) {
    const splitName = parsedResume.name.split(" ");
    if (splitName.length > 1) {
      result.firstName.status = EAPIStatus.success;
      result.firstName.value = splitName[0];
      result.lastName.status = EAPIStatus.success;
      result.lastName.value = splitName[1];
    } else {
      result.firstName.status = EAPIStatus.success;
      result.firstName.value = parsedResume.name;
    }
  }

  if (parsedResume.email) {
    result.email.status = EAPIStatus.success;
    result.email.value = parsedResume.email;
  }

  if (parsedResume.mobile_number) {
    result.phone.status = EAPIStatus.success;
    result.phone.value = parsedResume.mobile_number;
  }

  return result;
}

export function extractInfoFromParsedResumeAffinda(parsedResume: {
  [k: string]: any;
}): IExtractedInfoResult {
  const result: IExtractedInfoResult = {
    firstName: {
      status: EAPIStatus.fail,
      value: undefined,
    },
    lastName: {
      status: EAPIStatus.fail,
      value: undefined,
    },
    email: {
      status: EAPIStatus.fail,
      value: undefined,
    },
    phone: {
      status: EAPIStatus.fail,
      value: undefined,
    },
  };

  if (
    !parsedResume ||
    parsedResume.status !== "success" ||
    !parsedResume.result ||
    !parsedResume.result.data
  )
    return result;

  const data = parsedResume.result.data;

  if (data.name) {
    if (data.name.first) {
      result.firstName.status = EAPIStatus.success;
      result.firstName.value = data.name.first;
    }
    if (data.name.last) {
      result.lastName.status = EAPIStatus.success;
      result.lastName.value = data.name.first;
    }
  }

  if (data.emails && Array.isArray(data.emails) && data.emails.length >= 1) {
    result.email.status = EAPIStatus.success;
    result.email.value = data.emails[0];
  }

  if (
    data.phoneNumbers &&
    Array.isArray(data.phoneNumbers) &&
    data.phoneNumbers.length >= 1
  ) {
    result.phone.status = EAPIStatus.success;
    result.phone.value = data.phoneNumbers[0];
  }

  return result;
}
