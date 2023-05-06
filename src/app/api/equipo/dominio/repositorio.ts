import { Equipo } from './equipo';
export interface EquipoRepositorio {
    obtenerEquipoPorId:(id:string)=>Promise<Equipo|null>
}