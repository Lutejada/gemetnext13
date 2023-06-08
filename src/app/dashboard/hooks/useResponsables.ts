import axios from "axios";
import useSWR from "swr";
import { Responsable } from "../types";
import { httpBase } from "../../config/api-base";
export const useResponsables = () => {
  return {
    obtenerResponsables,
  };
};

const obtenerResponsables = () => {
  const fetcher = (url: string) =>
    httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<Responsable[]>(
    "/responsables",
    fetcher
  );
  return {
    responsables: data,
    isLoading,
    isError: error,
  };
};
