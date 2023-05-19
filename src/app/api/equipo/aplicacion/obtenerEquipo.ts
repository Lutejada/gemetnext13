import { EquipoNoEncontrado } from "../dominio/error.negocio";
import { EquipoRepositorio } from "../dominio/repositorio";

export const obtenerEquipo=async(repositorio:EquipoRepositorio,id:string)=>{
    const equipo = await repositorio.obtenerEquipoPorId(id);
    if(!equipo){
        throw new EquipoNoEncontrado()
    }
    return equipo
}