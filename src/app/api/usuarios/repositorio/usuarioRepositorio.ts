import { prisma } from "@/src/lib/prisma";
import { UsuarioRepositorio } from ".";
import { Usuario } from "../dominio";
import { CrearUsuarioDto } from "../dtos/crearUsuario.dto";

export const usuarioResitorio: UsuarioRepositorio = {
  crearUsuario: function (dto: CrearUsuarioDto): Promise<Usuario> {
    return prisma.usuario.create({
      data: {
        apellido: dto.apellido,
        cargo: dto.cargo,
        nombre: dto.nombre,
        correo: dto.correo,
        password: dto.password,
        usuario: dto.usuario,
        cliente_id: dto.clienteId,
        rol: dto.rol,
      },
    });
  },
  obtenerUsuarioCorreo: async function (
    correo: string,
    clienteId: string
  ): Promise<Usuario | null> {
    return prisma.usuario.findUnique({
      where: {
        cliente_id: clienteId,
        AND: {
          correo,
        },
      },
    });
  },
};
