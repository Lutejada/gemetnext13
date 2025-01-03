import { Cliente } from "../../cliente/dominio/entity";
import { Ubicacion } from "../../ubicaciones/dominio/entity";

export class Patron {
  id: string;
  codigo: string;
  descripcion: string;
  modelo: string;
  serie: string;
  marca_id?: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion?: Date | null;
  ubicacionId?: string;
  datos_metrologicos?: DatosMetrologicosPatrones | null;
  datos_complementarios?: DatosComplementariosPatrones | null;
  ubicacion?: Ubicacion;
  cliente?: Cliente;

  constructor(attributes: Partial<Patron> = {}) {
    this.id = attributes.id || "";
    this.codigo = attributes.codigo || "";
    this.descripcion = attributes.descripcion || "";
    this.modelo = attributes.modelo || "";
    this.serie = attributes.serie || "";
    this.marca_id = attributes.marca_id;
    this.fecha_creacion = attributes.fecha_creacion || new Date();
    this.fecha_actualizacion = attributes.fecha_actualizacion || new Date();
    this.fecha_inactivacion = attributes.fecha_inactivacion || null;
    this.ubicacionId = attributes.ubicacionId;
    this.datos_metrologicos = attributes.datos_metrologicos || null;
    this.datos_complementarios = attributes.datos_complementarios || null;
    this.ubicacion = attributes.ubicacion;
    this.cliente = attributes.cliente;
  }
}

export interface DatosMetrologicosPatrones {
  id: string;
  emp: number;
  division_escala: number;
  resolucion: number;
  rango_minimo: number;
  rango_maximo: number;
  valor_nominal: number;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion?: Date | null;
  patrones_id: string;
}

export interface DatosComplementariosPatrones {
  id: string;
  descripcion_especificaciones?: string | null;
  cumple_especificacion_instalaciones: cumple;
  utiliza_software: cumple;
  descripcion_software?: string | null;
  version_software?: string | null;
  fireware?: string | null;
  observaciones?: string | null;
  patron_id: string;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion?: Date | null;
}

export enum cumple {
  SI = "SI",
  NO = "NO",
}

export interface ProgramacionPatrones {
  id: string;
  actividad_id: string;
  frecuencia_id: string;
  equipo_id: string;
  equipo?: Patron;
  fecha_programacion: Date;
  fecha_creacion: Date;
  fecha_actualizacion: Date;
  fecha_inactivacion?: Date | null;
}
