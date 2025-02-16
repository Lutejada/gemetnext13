import * as z from "zod";
import { Identificacion } from "../../dominio/entity";

export interface CrearProveedorDTO {
  nombre: string;
  tipoIdetificacion: Identificacion;
  numeroIdentificacion: string;
  direccion: string;
  telefono: string;
  email: string;
}

export const schema = z.object({
  nombre: z.string(),
  tipoIdetificacion: z.enum(["NIT"]),
  numeroIdentificacion: z.string(),
  direccion: z.string(),
  telefono: z.string(),
  email: z.string().email(),
});
export const validarCrearProveedor = (proveedor: CrearProveedorDTO) => {
  return schema.parse(proveedor) as CrearProveedorDTO;
};
