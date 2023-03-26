// export async function fetchHandler(
//   url: string,
//   options: RequestInit = { method: "GET" }
// ) {
//   let result = {};
//   try {
//     const response = await fetch(url, options);
//   } catch (error) {}
//   return result;
// }

// import { IFormValues } from "@/components/apply/info/constants";
import { log } from "./misc";

export enum EAPIStatus {
  success = "success",
  fail = "fail",
  validation = "validation",
}

export interface IValidationError {
  value: string;
  msg: string;
  param: string;
  location: string;
}

export interface IPostJobAppResponse {
  status: EAPIStatus;
  data?: any;
  validationErrors?: IValidationError[];
  error?: any;
}

export interface IJobApp {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface IPostJobAppResult {
  status: EAPIStatus;
  jobApplication?: IJobApp;
  validationErrors?: IValidationError[];
}

export async function postJobApplication(values: { [k: string]: string }) {
  const result: IPostJobAppResult = {
    status: EAPIStatus.fail,
    jobApplication: undefined,
    validationErrors: undefined,
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/careers`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const parsedResponse: IPostJobAppResponse = await response.json();

    if (!response.ok) {
      log({
        message: `This is an HTTP error: The status is ${response.status}`,
      });
      return result;
    }

    if (
      !parsedResponse ||
      !parsedResponse.status ||
      parsedResponse.status === "fail"
    ) {
      const msg = parsedResponse.data || "Something went wrong";
      log({ message: msg });
      return result;
    }

    if (parsedResponse.status === EAPIStatus.validation) {
      if (parsedResponse.validationErrors) {
        result.status = EAPIStatus.validation;
        result.validationErrors = parsedResponse.validationErrors;
      } else {
        log({ message: "Something went wrong" });
        return result;
      }
    }

    if (parsedResponse.status === EAPIStatus.success) {
      result.status = EAPIStatus.success;
      result.jobApplication = parsedResponse.data;
      return result;
    }

    return result;
  } catch (error) {
    log({ message: error });

    return result;
  }
}
