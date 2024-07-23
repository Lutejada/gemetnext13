import { Marca } from "../dominio";
import { CrearMarcaDto } from "../dtos/crearMarca.dto";
import { EditarMarcaDto } from "../dtos/editarMarcadto";

export interface MarcaRepositorio {
  crearMarca: (dto: CrearMarcaDto, clienteId: string) => Promise<Marca>;
  obtenerMarcas: (clienteId: string) => Promise<Marca[]>;
  editarMarca: (dto: EditarMarcaDto, clienteId: string) => Promise<void>;
}
