import { prisma } from '@/src/lib/prisma';
import { Actividad } from '../dominio';
import { CrearActividadDto } from '../dtos/crear';
import { ActividadRepositorio } from './index';
export const actividadRepositorio :ActividadRepositorio={
    crearActividad: function (dto: CrearActividadDto): Promise<Actividad> {
        return prisma.tipo_actividad.create({
            data: {
                descripcion: dto.descripcion,                
            }
        });
    },
    obtenerActividades: function (): Promise<Actividad[]> {
        return prisma.tipo_actividad.findMany()
    }
}