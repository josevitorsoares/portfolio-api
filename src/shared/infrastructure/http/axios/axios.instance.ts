import axios, { type AxiosInstance } from 'axios';

export const axiosInstance = axios.create({
  timeout: 5 * 1000, // 5 (five) seconds
});

export type HttpAxiosInstance = AxiosInstance;
