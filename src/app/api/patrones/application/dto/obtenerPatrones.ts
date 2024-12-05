import { Documentos } from "@/app/api/common/types";

export class PatronInformacionBasicaDTO {
  codigo: string;
  id: string;
  descripcion: string;
  marca: string;
  responsable: string;
  documentos?: Documentos[];
}
