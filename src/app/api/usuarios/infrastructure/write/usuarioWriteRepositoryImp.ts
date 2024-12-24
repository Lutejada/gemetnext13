import { prisma } from "@/lib/prisma";
import { Role, Usuario } from "../../dominio/entity";
import { UsuarioWriteRepository } from "../../dominio/repository/index";
export class UsuarioWriteRepositoryImp implements UsuarioWriteRepository {
  async crearUsuarios(usuario: Usuario): Promise<void> {
    await prisma.usuario.create({
      data: {
        usuario: usuario.usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        cargo: usuario.cargo,
        rol: usuario.rol as Role,
        correo: usuario.correo,
        password: usuario.password,
        clienteId: usuario.cliente.id,
      },
    });
  }
}
