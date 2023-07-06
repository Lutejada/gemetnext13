import useSWRMutation from 'swr/mutation';
import { crearUbicacionDto } from '../../api/ubicaciones/dtos/crearUbicacion.dto';
import { httpBase } from '../../config/api-base';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { Ubicacion } from '../../api/ubicaciones/types';
export const crearUbicacion =()=>{
    const fetcher = (
        url: string,
        { arg }: { arg: crearUbicacionDto }
      ) => httpBase.post(url, arg).then((res) => res.data);
    
    
      const { data, error, trigger, isMutating } = useSWRMutation(
        "/ubicaciones",
        fetcher
      );
    
      return {
        isLoading: isMutating,
        responsable: data,
        crear:trigger,
        error: error as AxiosError,
        errorMsg: error?.response?.data?.error,
      };
}


export const obtenerUbicaciones = () => {
  const fetcher = (url: string) => httpBase.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<Ubicacion[]>(
    "/ubicaciones",
    fetcher
  );
  return {
    ubicaciones: data ?? [],
    isLoading,
    isError: error,
  };
};

