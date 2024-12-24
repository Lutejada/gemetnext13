import { Usuario } from "../../dominio/entity";

export class ListarUsuriosDTO {
  nombre: string;
  correo: string;
  rol: string;
  cargo: string;

  static fromDomain(usuario: Usuario): ListarUsuriosDTO {
    return {
      nombre: usuario.nombre + " " + usuario.apellido,
      correo: usuario.correo,
      rol: usuario.rol,
      cargo: usuario.cargo,
    };
  }
}
