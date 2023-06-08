import axios from "axios";

export const httpBase = axios.create({
  baseURL: "/api",
});
