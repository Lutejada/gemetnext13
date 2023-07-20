import { prisma } from '@/src/lib/prisma';
import { TipoPatron } from '../dominio';
import { CrearTipoPatronDto } from '../dtos/crear';
import { TipoPatronRespositorio } from './index';
export const tipoPatronRespositorio:TipoPatronRespositorio={
    creatTipoPatron: function (dto: CrearTipoPatronDto): Promise<TipoPatron> {
        return prisma.tipo_patron.create({
            data:{
                alias:dto.alias,
                descripcion:dto.descripcion
            }
        })
    }
}