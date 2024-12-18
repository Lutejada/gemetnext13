import { Identificacion, Proveedor } from "../../dominio/entity";

export class ListarProveedoresDTO {
  nombre: string;
  tipoIdentificacion: Identificacion;
  numeroIdentificacion: string;
  telefono: string;
  email: string;

  static entityToDto(proveedor: Proveedor): ListarProveedoresDTO {
    return {
      nombre: proveedor.nombre,
      tipoIdentificacion: proveedor.tipoIdetificacion as Identificacion,
      numeroIdentificacion: proveedor.numeroIdentificacion,
      telefono: proveedor.telefono,
      email: proveedor.email,
    };
  }
}
