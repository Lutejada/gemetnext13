import { Cliente } from "@/app/api/cliente/dominio/entity";
export class PasswordResetToken {
  id: string;
  email: string;
  token: string;
  expires: Date;
  cliente: Cliente;
}
