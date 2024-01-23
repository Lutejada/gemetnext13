import { CrearMarcaDto } from "../dtos/crearMarca.dto";
import { marcaRepositorio } from "../repositorio/marcaRepositorio";

export const crearMarca=(dto:CrearMarcaDto,clienteId:string)=>{
    return marcaRepositorio.crearMarca(dto,clienteId)
}