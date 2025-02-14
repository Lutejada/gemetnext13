import { Role } from "@/app/api/usuarios/dominio/entity";

export const rolesGuard = (authorizeRoles: Role[], incomingRole: Role) => {
  if (!authorizeRoles.includes(incomingRole)) {
    throw new Error("No tienes permisos para realizar esta acción", {
      cause: "Unauthorized",
    });
  }
  return true;
};
