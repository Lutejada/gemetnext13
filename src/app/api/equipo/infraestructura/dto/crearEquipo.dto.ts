import { object, string } from "zod";

const Equipo = object({
  nombre: string({ description: "debe ser un string" }),
});

export const validateEquipo = (object: any) => {
    return Equipo.parse(object)
};
