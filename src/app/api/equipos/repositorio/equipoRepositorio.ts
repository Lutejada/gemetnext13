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
                marca_id:dto.marcaId,
                ubicacion_id:dto.ubicacionId,
            }
        })
    }
}