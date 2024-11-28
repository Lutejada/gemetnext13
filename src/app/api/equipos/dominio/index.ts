import { Cliente } from "../../cliente/dominio";
import { Marca } from "../../marca/dominio";
import { Ubicacion } from "../../ubicaciones/dominio/entity";
import { Frecuencia } from "../../frecuencia/dominio";
import { Actividad } from "../../actividad/dominio";

export { type equipo } from "@prisma/client";

export class Equipo {
  id: string;
  codigo: string;
  descripcion: string;
  modelo: string;
  serie: string;
  marca_id: string;
  marca?: Marca;
  ubicacion?: Ubicacion;
  ubicacion_id: string;
  cliente_id: string;
  fecha_creacion: Date | string;
  fecha_actualizacion: Date | string;
  fecha_inactivacion?: Date | string | null;
  datos_metrologicos?: DatosMetrologicosEquipos | null;
  datos_complementarios?: DatosComplementariosEquipo | null;
  cliente?: Cliente | null;

  constructor(attributes: Equipo) {
    this.id = attributes.id;
    this.codigo = attributes.codigo;
    this.descripcion = attributes.descripcion;
    this.modelo = attributes.modelo;
    this.serie = attributes.serie;
    this.marca_id = attributes.marca_id;
    this.marca = attributes.marca;
    this.ubicacion = attributes.ubicacion;
    this.ubicacion_id = attributes.ubicacion_id;
    this.cliente_id = attributes.cliente_id;
    this.fecha_creacion = attributes.fecha_creacion;
    this.fecha_actualizacion = attributes.fecha_actualizacion;
    this.fecha_inactivacion = attributes.fecha_inactivacion;
    this.datos_metrologicos = attributes.datos_metrologicos;
    this.datos_complementarios = attributes.datos_complementarios;
    this.cliente = attributes.cliente;
  }
}


export interface DatosMetrologicosEquipos {
  id: string;
  equipo_id: string;
  emp: number;
  division_escala: number;
  resolucion: number;
  rango_minimo: number;
  rango_maximo: number;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion?: Date | null;
}

export interface DatosComplementariosEquipo {
  id: string;
  descripcion_especificaciones?: string | null;
  cumple_especificacion_instalaciones: cumple;
  utiliza_software: cumple;
  descripcion_software?: string | null;
  version_software?: string | null;
  fireware?: string | null;
  observaciones?: string | null;
  equipo_id: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion?: Date | null;
}

export enum cumple {
  SI = "SI",
  NO = "NO",
}

export enum EstadoProgramacion {
  PENDIENTE = "PENDIENTE",
  COMPLETADO = "COMPLETADO",
}
export class ProgramacionEquipos {
  id: string;
  equipo?: Equipo;
  actividad?: Actividad;
  frecuencia?: Frecuencia;
  fechaProgramacion: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  fechaInactivacion?: Date | null;
  estado: EstadoProgramacion;
  constructor(attributes: ProgramacionEquipos) {
    this.id = attributes.id;
    this.equipo = attributes.equipo;
    this.actividad = attributes.actividad;
    this.frecuencia = attributes.frecuencia;
    this.fechaProgramacion = attributes.fechaProgramacion;
    this.fechaCreacion = attributes.fechaCreacion;
    this.fechaActualizacion = attributes.fechaActualizacion;
    this.fechaInactivacion = attributes.fechaInactivacion;
    this.estado = attributes.estado;
  }
}
