import { z } from "zod";

export interface CambiarPasswordDTO {
  passwordTemporal: string;
  nuevoPassword: string;
  correo: string;
}

export const cambiarPasswordDTOschema = z.object({
  passwordTemporal: z.string(),
  nuevoPassword: z.string(),
  correo: z.string().email(),
});

export const validarCambiarPasswordDto = (usuario: CambiarPasswordDTO) => {
  return cambiarPasswordDTOschema.parse(usuario) as CambiarPasswordDTO;
};
