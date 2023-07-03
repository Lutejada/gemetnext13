import { prisma } from '@/src/lib/prisma';
import { Frecuencia } from '../dominio';
import { CrearFrecuenciaDto } from '../dtos/crear';
import { FrecuenciaRepositorio } from './index';
export const frecuenciaRepositorio : FrecuenciaRepositorio= {
    crearFrecuencia: function (dto: CrearFrecuenciaDto): Promise<Frecuencia> {
        return prisma.frecuencia.create({
            data:{
                cantidad_dias:dto.cantidadDias,
                descripcion:dto.identificacion
            }
        })
    },
    obtenerFrecuencias: function (): Promise<Frecuencia[]> {
        return prisma.frecuencia.findMany()
    }
}