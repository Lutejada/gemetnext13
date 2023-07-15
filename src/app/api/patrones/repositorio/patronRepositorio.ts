import { prisma } from '@/src/lib/prisma';
import { Patron } from '../dominio';
import { CrearPatronDto } from '../dtos/crear';
import { PatronRepositorio } from './index';
export const patronRepositorio :PatronRepositorio={
    crearPatron: async function (dto: CrearPatronDto): Promise<Patron> {
        return prisma.patrones.create({
            data:{
                codigo:dto.codigo,
                descripcion:dto.descripcion,
                modelo:dto.modelo,
                serie:dto.serie,
                marca_id:dto.marca_id,
                ubicacionId:dto.ubicacionId,
                responsable_id:dto.responsable_id,                     
            }
        })
    }
}