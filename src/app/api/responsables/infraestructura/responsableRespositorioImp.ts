import { ResponsableRepositorio } from "../dominio/repositorio";

export function responsableRespositoryImpl(): ResponsableRepositorio {
    return {
        crearResponsable
    };
  }

const crearResponsable=()=>{
    throw Error()
}