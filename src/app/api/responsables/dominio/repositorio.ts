import { Responsable } from "./responsable";

export interface ResponsableRepositorio {
    crearResponsable:()=>Promise<Responsable>
}