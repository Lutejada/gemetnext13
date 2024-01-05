import { UsuarioNoExiste } from "../errors"
import { usuarioResitorio } from "../repositorio/usuarioRepositorio"

export const obtenerUsuarioCorreo=async(correo:string,clientId:string)=>{
    const usuario = await usuarioResitorio.obtenerUsuarioCorreo(correo,clientId)
    if(!usuario){
        throw new UsuarioNoExiste()
    }
    return usuario
}