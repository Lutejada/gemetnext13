import { object, string } from "zod";

export class ForgotPasswordDTO {
  email: string;
  clienteNombre: string;
}

export const validarforgotPasswordDTO = (value: ForgotPasswordDTO) => {
  return object({
    email: string().email(),
    clienteNombre: string({ description: "el nombre del requerido" }),
  }).parse(value);
};
