import { AxiosRequestConfig } from "axios";
import { stringify } from "qs";

export const AxiosConfig: AxiosRequestConfig = {
  timeout: 60 * 1000,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  paramsSerializer: {
    serialize: (params) => stringify(params, { arrayFormat: 'brackets' })
  }
};