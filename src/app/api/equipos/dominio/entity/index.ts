import { Marca } from "@/app/api/marca/dominio";
import { Ubicacion } from "@/app/api/ubicaciones/dominio/entity";
import { DatosComplementariosEquipo, DatosMetrologicosEquipos } from "..";
import { Cliente } from "@/app/api/cliente/dominio/entity";
import { Documentos } from "@/app/api/common/types";

export class EquipoEntity {
  id: string;
  codigo: string;
  descripcion: string;
  modelo: string;
  serie: string;
  marca: Marca;
  ubicacion: Ubicacion;
  fechaCreacion: Date | string;
  fechaActualizacion: Date | string;
  fechaInactivacion?: Date | string | null;
  datosMetrologicos?: DatosMetrologicosEquipos | null;
  datosComplementarios?: DatosComplementariosEquipo | null;
  cliente?: Cliente | null;
  documentos?: Documentos[];

  constructor(attributes: Partial<EquipoEntity> = {}) {
    this.id = attributes.id ?? "Desconocido";
    this.codigo = attributes.codigo ?? "Desconocido";
    this.descripcion = attributes.descripcion ?? "Desconocido";
    this.modelo = attributes.modelo ?? "Desconocido";
    this.serie = attributes.serie ?? "Desconocido";
    this.marca = attributes.marca ?? new Marca();
    this.ubicacion = attributes.ubicacion ?? new Ubicacion();
    this.fechaCreacion = attributes.fechaCreacion ?? new Date().toISOString();
    this.fechaActualizacion =
      attributes.fechaActualizacion ?? new Date().toISOString();
    this.fechaInactivacion = attributes.fechaInactivacion ?? null;
    this.datosMetrologicos = attributes.datosMetrologicos ?? null;
    this.datosComplementarios = attributes.datosComplementarios ?? null;
    this.cliente = attributes.cliente ?? null;
    this.documentos = attributes.documentos ?? [];
  }
}
