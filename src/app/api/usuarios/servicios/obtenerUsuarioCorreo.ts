import { UsuarioNoExiste } from "../errors"
import { usuarioResitorio } from "../repositorio/usuarioRepositorio"

export const obtenerUsuarioCorreo=async(correo:string)=>{
    console.log(correo);
    const usuario = await usuarioResitorio.obtenerUsuarioCorreo(correo)
    console.log(usuario);
    if(!usuario){
        throw new UsuarioNoExiste()
    }
    return usuario
}