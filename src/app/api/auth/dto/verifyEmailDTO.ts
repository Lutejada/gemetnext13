import { object, string } from "zod";

export class VerifyNewUserDTO {
  correo: string;
  password: string;
  verifiedCode: string;
  clienteNombre: string;
}

export const validarVerifyNewUser = (value: VerifyNewUserDTO) => {
  return object({
    correo: string({ description: "correo es requerido" }).email(),
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
    verifiedCode: string({ description: "verifiedCode es requerido" }).min(8),
    clienteNombre: string({ description: "el nmbre del requerido" }),
  }).parse(value);
};
