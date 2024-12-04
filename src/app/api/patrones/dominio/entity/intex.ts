import { Cliente } from "@/app/api/cliente/dominio";
import { Marca } from "@/app/api/marca/dominio";
import { Ubicacion } from "@/app/api/ubicaciones/dominio/entity";
import { DatosComplementariosPatrones, DatosMetrologicosPatrones } from "..";
import { Documentos } from "@/app/api/common/types";
import { TipoPatron } from "@/app/api/tipoPatron/dominio";

export class PatronEntity {
  id: string;
  codigo: string;
  descripcion: string;
  modelo: string;
  serie: string;
  marca: Marca;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  fechaInactivacion?: Date | null;
  datosMetrologicos?: DatosMetrologicosPatrones | null;
  datosComplementarios?: DatosComplementariosPatrones | null;
  ubicacion: Ubicacion;
  cliente: Cliente;
  documentos: Documentos[];
  tipoPatron: TipoPatron;

  constructor(attributes: Partial<PatronEntity> = {}) {
    this.id = attributes.id || "";
    this.codigo = attributes.codigo || "";
    this.descripcion = attributes.descripcion || "";
    this.modelo = attributes.modelo || "";
    this.serie = attributes.serie || "";
    this.marca = attributes.marca ?? new Marca();
    this.fechaCreacion = attributes.fechaCreacion || new Date();
    this.fechaActualizacion = attributes.fechaActualizacion || new Date();
    this.fechaInactivacion = attributes.fechaInactivacion || null;
    this.datosMetrologicos = attributes.datosMetrologicos || null;
    this.datosComplementarios = attributes.datosComplementarios || null;
    this.ubicacion = attributes.ubicacion ?? new Ubicacion();
    this.cliente = attributes.cliente ?? new Cliente();
    this.documentos = attributes.documentos ?? [];
    this.tipoPatron = attributes.tipoPatron ?? new TipoPatron()
  }
}
