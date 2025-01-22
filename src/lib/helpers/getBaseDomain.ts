import { Cliente } from "@/app/api/cliente/dominio/entity";

export const getBaseDomain = (cliente: Cliente): string => {
  console.log("process.env.DOMAIN", process.env.DOMAIN);
  let baseDomain = `https://${cliente.nombre}.${process.env.DOMAIN}`;
  if (process.env.APP_ENV === "local") {
    baseDomain = `http://${cliente.nombre}.${process.env.DOMAIN}`;
    return baseDomain;
  }
  return baseDomain;
};
