import { Marca } from "../dominio";
import { CrearMarcaDto } from "../dtos/crearMarca.dto";

export interface MarcaRepositorio {
  crearMarca: (dto: CrearMarcaDto, clienteId: string) => Promise<Marca>;
  obtenerMarcas: (clienteId: string) => Promise<Marca[]>;
}
