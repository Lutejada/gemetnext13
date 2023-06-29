import { Marca } from "../dominio";
import {  CrearMarcaDto } from '../dtos/crearMarca.dto';

export interface MarcaRepositorio {
  crearMarca: (dto: CrearMarcaDto) => Promise<Marca>;
  obtenerTodoMarca:()=>Promise<Marca[]>
}
