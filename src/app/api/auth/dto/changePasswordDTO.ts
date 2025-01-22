import { object, string } from "zod";

export class ChangePasswordDTO {
  password: string;
  token: string;
  clienteNombre: string;
}

export const validarChangePasswordDTO = (value: ChangePasswordDTO) => {
  return object({
    password: string()
      .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial",
        }
      ),
    token: string({ description: "token es requerido" }).uuid(),
    clienteNombre: string({ description: "el nombre del requerido" }),
  }).parse(value);
};
