import axios from "axios";

export const BASE_URL = "https://api.vimeo.com";
export const VIMEO_TOKEN = "fdbc3fc2c18dc47fcb908aeaaf433e4f";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((req) => {
  req.params = {
    ...req.params,
  };

  req.headers.Authorization = `Bearer ${VIMEO_TOKEN}`;
  return req;
});

export default class vimeoApiClient<Req, Res> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  get = (data?: any) => {
    let queryParams = "";
    if (data?.meta) {
      queryParams = new URLSearchParams(data.meta.params).toString();
    }
    return axiosInstance
      .get<Res>(
        `${this.endpoint}${(data?.meta?.params && "?" + queryParams) || ""}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err.response.data;
      });
  };

  put = (data?: Req): Promise<Res> => {
    return axiosInstance
      .put<Res>(this.endpoint, data)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  };

  post = (data?: Req, headers?: {}, id?: string): Promise<Res> => {
    return axiosInstance
      .post<Res>(!id ? this.endpoint : `${this.endpoint}/${id}`, data, headers)
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  };

  delete = (data: Req): Promise<Res> => {
    return axiosInstance
      .delete<Res>(this.endpoint, {
        data,
      })
      .then((res) => res.data)
      .catch((err) => {
        throw err.response.data;
      });
  };
}
