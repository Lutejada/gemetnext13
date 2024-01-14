import { prisma } from "@/src/lib/prisma";
import { VariableRespositorio } from ".";
import { Variable } from "../dominio";
import { CrearVariableDto } from "../dtos/crear";

export const variableRepositorio: VariableRespositorio = {
  crearVariable: function (
    dto: CrearVariableDto,
    clienteId: string
  ): Promise<Variable> {
    return prisma.variable.create({
      data: {
        alias: dto.alias,
        cliente_id: clienteId,
        descripcion: dto.descripcion,
        magnitud_id: dto.magnitud_id,
      },
    });
  },
};
