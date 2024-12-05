import { Documentos } from "@/app/api/common/types";
import { PatronEntity } from "../../dominio/entity/intex";

export class PatronInformacionBasicaDTO {
  codigo: string;
  id: string;
  descripcion: string;
  marca: string;
  responsable: string;
  documentos?: Documentos[];

  static converToDTO(equipos: PatronEntity[]): PatronInformacionBasicaDTO[] {
    return equipos.map((e) => ({
      id: e.id,
      codigo: e.codigo,
      descripcion: e.descripcion,
      marca: e.marca.descripcion,
      responsable:
        e.ubicacion.responsable.nombre + " " + e.ubicacion.responsable.apellido,
      documentos: e.documentos,
    }));
  }
}
