import { equipoRepositorio } from "../../infrastructure/equipoRepositorio"

export const listarEquiposProgramadosVencer=(clienteId: string)=>{
    return equipoRepositorio.listarEquiposProgramadosPorVencer(clienteId)
}