import useSWRMutation from 'swr/mutation';
import { crearUbicacionDto } from '../../api/ubicaciones/dtos/crearUbicacion.dto';
import { httpBase } from '../../config/api-base';
import { AxiosError } from 'axios';
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