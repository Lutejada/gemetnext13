import { prisma } from "@/src/lib/prisma";
import { UsuarioRepositorio } from ".";
import { Usuario } from "../dominio";
import { CrearUsuarioDto } from "../dtos/crearUsuario.dto";

export const usuarioResitorio: UsuarioRepositorio = {
  crearUsuario,
  obtenerUsuarioCorreo,
};

function crearUsuario(dto: CrearUsuarioDto): Promise<Usuario> {
  return prisma.usuario.create({
    data: {
      nombre: dto.nombre,           
      correo: dto.correo,
      password: dto.password,
      apellido:dto.apellido,
      cargo:dto.cargo,
      usuario:dto.cargo,
      rol:dto.rol,             
    },
  });
}

function obtenerUsuarioCorreo(correo: string): Promise<Usuario | null> {
  return prisma.usuario.findUnique({
    where: {
      correo,
    },
  });
}
