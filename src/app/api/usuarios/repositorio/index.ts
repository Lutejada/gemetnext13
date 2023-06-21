import { Usuario } from "../dominio";
import { CrearUsuarioDto } from "../dtos/crearUsuario.dto";

export interface UsuarioRepositorio {
    crearUsuario:(dto:CrearUsuarioDto)=> Promise<Usuario>
    obtenerUsuarioCorreo(correo:string):Promise<Usuario | null>
}