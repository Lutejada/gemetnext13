import { prisma } from '@/src/lib/prisma';
import { Equipo } from '../dominio';
import { CrearEquipoDto } from '../dtos/crear';
import { EquipoRepositorio } from './index';
export const equipoRepositorio:EquipoRepositorio = {
    crearEquipo: function (dto: CrearEquipoDto): Promise<Equipo> {
        return prisma.equipo.create({
            data:{
                codigo:dto.codigo,
                descripcion:dto.descripcion,
                modelo:dto.modelo,
                serie:dto.serie,
                responsable_id:dto.responsable_id,
                marca_id:dto.marca_id,
                ubicacionId:dto.ubicacionId,
            }
        })
    }
}