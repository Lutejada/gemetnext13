import { Usuario } from "../../dominio/entity";

export class ListarUsuriosDTO {
  id: string;
  nombre: string;
  correo: string;
  rol: string;
  cargo: string;

  static fromDomain(usuario: Usuario): ListarUsuriosDTO {
    return {
      id: usuario.id,
      nombre: usuario.nombre + " " + usuario.apellido,
      correo: usuario.correo,
      rol: usuario.rol,
      cargo: usuario.cargo,
    };
  }
}
