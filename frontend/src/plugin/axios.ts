import axios, { AxiosInstance } from "axios";
import { baseUrl } from "../config/baseUrl";

const requestHandler: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export { requestHandler };
