import axios, { AxiosInstance, AxiosRequestConfig, Method, AxiosError } from "axios";
import { AxiosConfig } from "../constants/global";

class AxiosClient {

  private readonly axiosInstance: AxiosInstance
  constructor(
    config?: AxiosRequestConfig
  ) {

    this.axiosInstance = axios.create({ ...AxiosConfig, ...config })
    this.setupInterceptors()
  }

  private setupInterceptors() {

    this.axiosInstance.interceptors.request.use(
      (config) => {

        return config
      },
      (error) => Promise.reject(error),
    )

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {

        switch (error.code) {

          case AxiosError.ECONNABORTED:

            break
          case AxiosError.ETIMEDOUT:

            break
          default:
        }

        return Promise.reject(error)
      },
    )
  }
  public async request<T>(
    method: Method,
    url: string,
    options?: {
      params?: any;
      data?: any;
    } & AxiosRequestConfig
  ): Promise<T> {

    const { params, data, ...config } = options || {};

    try {

      const mergedHeaders = {
        ...AxiosConfig.headers,
        ...(config?.headers || {})
      }

      const response = await this.axiosInstance.request<T>({
        method,
        url,
        params: ['get', 'delete', 'head'].includes(method.toLowerCase()) ? params : undefined,
        data: ['post', 'put', 'patch'].includes(method.toLowerCase()) ? data : undefined,
        ...config,
        headers: mergedHeaders
      })

      return response.data
    } catch (error) {
      throw error
    }
  }

  public post<T, P>(
    url: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<P> {
    return this.request<P>("post", url, { data, ...config });
  }

  public get<T, P>(
    url: string,
    params: T,
    config?: AxiosRequestConfig
  ): Promise<P> {

    return this.request<P>("get", url, { params, ...config });
  }
}

export const axiosClient = new AxiosClient()