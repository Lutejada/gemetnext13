import { prisma } from "@/lib/prisma";
import { Role, Usuario } from "../../dominio/entity";
import { UsuarioWriteRepository } from "../../dominio/repository/index";
export class UsuarioWriteRepositoryImp implements UsuarioWriteRepository {
  async crearUsuarios(usuario: Usuario): Promise<void> {
    await prisma.usuario.create({
      data: {
        id: usuario.id,
        usuario: usuario.usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        cargo: usuario.cargo,
        rol: usuario.rol as Role,
        correo: usuario.correo,
        password: usuario.password,
        fechaCreacion: usuario.fechaCreacion,
        fechaActualizacion: usuario.fechaActualizacion,
        fechaInactivacion: usuario.fechaInactivacion,
        clienteId: usuario.cliente.id,
      },
    });
  }
}
