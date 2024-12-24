import { Usuario } from "../entity";

export interface UsuarioReadRepository {
  listarUsuarios(clienteId: string): Promise<Usuario[]>;
  obtenerCorreo(correo: string, clienteId: string): Promise<Usuario | null>;
}

export interface UsuarioWriteRepository {
  crearUsuarios(usuario: Usuario): Promise<void>;
}
