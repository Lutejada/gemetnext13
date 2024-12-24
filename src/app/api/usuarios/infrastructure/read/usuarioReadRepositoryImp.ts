import { prisma } from "@/lib/prisma";
import { Usuario } from "../../dominio/entity";
import { UsuarioReadRepository } from "../../dominio/repository";
import { usuario as UsuarioPrisma } from "@prisma/client";

export class UsuarioReadRepositoryImp implements UsuarioReadRepository {
  async listarUsuarios(clienteId: string): Promise<Usuario[]> {
    const res = await prisma.usuario.findMany({
      where: {
        clienteId,
      },
    });

    return res.map((usuario) => this.mapToDomainUsuario(usuario));
  }

  private mapToDomainUsuario(usuarioPrisma: UsuarioPrisma): Usuario {
    return new Usuario({
      id: usuarioPrisma.id,
      usuario: usuarioPrisma.usuario,
      nombre: usuarioPrisma.nombre,
      apellido: usuarioPrisma.apellido,
      cargo: usuarioPrisma.cargo,
      rol: usuarioPrisma.rol,
      correo: usuarioPrisma.correo,
      password: usuarioPrisma.password,
      fechaCreacion: usuarioPrisma.fechaCreacion,
      fechaActualizacion: usuarioPrisma.fechaActualizacion,
      fechaInactivacion: usuarioPrisma.fechaInactivacion,
    });
  }

  async obtenerPorCorreo(
    correo: string,
    clienteId: string
  ): Promise<Usuario | null> {
    const res = await prisma.usuario.findUnique({
      where: {
        correo,
        clienteId,
      },
    });

    if (!res) return null;
    return this.mapToDomainUsuario(res);
  }
}
