import { prisma } from '@/src/lib/prisma';
import { Marca } from '../dominio';
import { CrearMarcaDto } from '../dtos/crearMarca.dto';
import { MarcaRepositorio } from './index';
export const marcaRepositorio:MarcaRepositorio = {
    crearMarca: function (dto: CrearMarcaDto): Promise<Marca> {
        return prisma.marca.create({
            data:{
                descripcion:dto.descripcion,
                identificacion:dto.identificacion
            }
        })
    }
}