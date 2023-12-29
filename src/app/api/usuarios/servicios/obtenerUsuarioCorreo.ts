import { UsuarioNoExiste } from "../errors"
import { usuarioResitorio } from "../repositorio/usuarioRepositorio"

export const obtenerUsuarioCorreo=async(correo:string)=>{
    const usuario = await usuarioResitorio.obtenerUsuarioCorreo(correo)
    if(!usuario){
        throw new UsuarioNoExiste()
    }
    return usuario
}