import { prisma } from "@/src/lib/prisma";
import { Marca } from "../dominio";
import { CrearMarcaDto } from "../dtos/crearMarca.dto";
import { MarcaRepositorio } from "./index";
import { EditarMarcaDto } from "../dtos/editarMarcadto";
export const marcaRepositorio: MarcaRepositorio = {
  crearMarca: function (dto: CrearMarcaDto, clienteId: string): Promise<Marca> {
    return prisma.marca.create({
      data: {
        cliente_id: clienteId,
        descripcion: dto.descripcion,
        identificacion: dto.identificacion,
      },
    });
  },
  obtenerMarcas: function (clienteId: string): Promise<Marca[]> {
    return prisma.marca.findMany({ where: { cliente_id: clienteId } });
  },
  editarMarca: async function (dto: EditarMarcaDto, clienteId: string) {
    await prisma.marca.update({
      where: {
        cliente_id: clienteId,
        id: dto.id,
      },
      data: {
        descripcion: dto.descripcion,
        identificacion: dto.identificacion,
      },
    });
  },
};
