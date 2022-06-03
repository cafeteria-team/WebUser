import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  timeout: 2000,
  headers: {},
});
export default axiosInstance;
