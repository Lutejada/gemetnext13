import { Cliente } from "@/app/api/cliente/dominio";
export class Usuario {
  id: string;
  usuario: string;
  nombre: string;
  apellido: string;
  cargo: string;
  rol: string | Role;
  correo: string;
  password: string;
  fechaCreacion: string | Date;
  fechaActualizacion: string | Date;
  fechaInactivacion?: string | Date | null;
  cliente: Cliente;

  constructor(attributtes: Partial<Usuario> = {}) {
    this.id = attributtes.id ?? "";
    this.usuario = attributtes.usuario ?? "";
    this.nombre = attributtes.nombre ?? "";
    this.apellido = attributtes.apellido ?? "";
    this.cargo = attributtes.cargo ?? "";
    this.rol = attributtes.rol ?? Role.Consulta;
    this.correo = attributtes.correo ?? "";
    this.password = attributtes.password ?? "";
    this.fechaCreacion = attributtes.fechaCreacion ?? "";
    this.fechaActualizacion = attributtes.fechaActualizacion ?? "";
    this.fechaInactivacion = attributtes.fechaInactivacion ?? "";
    this.cliente = attributtes.cliente ?? new Cliente();
  }
}
export enum Role {
  Admin = "Admin",
  Metrologo = "Metrologo",
  Auxiliar = "Auxiliar",
  Consulta = "Consulta",
  Cordinador = "Cordinador",
}
