import { CrearUsuarioDto } from "../dtos/crearUsuario.dto";
import { usuarioResitorio } from "../repositorio/usuarioRepositorio";

export const crearUsuario =(dto:CrearUsuarioDto)=>{
    return usuarioResitorio.crearUsuario(dto)
}