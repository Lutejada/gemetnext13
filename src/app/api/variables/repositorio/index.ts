import { Variable } from "../dominio";
import { CrearVariableDto } from "../dtos/crear";

export interface VariableRespositorio {
    crearVariable:(dto:CrearVariableDto)=>Promise<Variable>
}