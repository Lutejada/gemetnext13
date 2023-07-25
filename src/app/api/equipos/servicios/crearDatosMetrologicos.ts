import { CrearDatosMetrologicosDto } from "../dtos/crearDatosMetrologicos.dto"
import { EquipoNoExiste } from "../errors";
import { equipoRepositorio } from "../repositorio/equipoRepositorio"

export const crearDatosMetrologicos =async(dto:CrearDatosMetrologicosDto)=>{
    const equipoExiste = await equipoRepositorio.obtenerEquipoPorId(dto.equipoId)
    if(!equipoExiste){
        throw new EquipoNoExiste();
    }

    return equipoRepositorio.crearDatosMetrologicos(dto)
}