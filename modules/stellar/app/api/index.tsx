import axios, {AxiosRequestConfig} from "axios"
import {QueryClient} from "react-query"

const BASE_URL = "http://localhost:5000"

const STALE_TIME_MILLIS = 300000 // 5 minutes in milliseconds
export const queryClient = new QueryClient({
  defaultOptions: {queries: {staleTime: STALE_TIME_MILLIS}},
})

// AXIOS setup
let api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

export function stellarAxios<Response>(axiosConfig: AxiosRequestConfig) {
  return api.request<Response>(axiosConfig).then(response => response.data)
}
