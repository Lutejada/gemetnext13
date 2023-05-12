import { EquipoRepositorio } from "../dominio/repositorio";

export const crearEquipo =async (repositorio:EquipoRepositorio)=>{

    const equipoencontrado = await repositorio.obtenerEquipoPorId('12');
    if(equipoencontrado){
        throw new Error('el equipo ya existe ') //negocio Equipo existe
    }

    const newEquipo = await repositorio.crearEquipo()
    return  newEquipo


}