import { PrismaClient } from "@prisma/client";
import { UbicacionRepositorio } from ".";
import { crearUbicacionDto } from "../dtos/crearUbicacion.dto";

const crearUbicacion =async (ubicacion: crearUbicacionDto)=>{
    const prisma = new PrismaClient();
    return prisma.ubicacion.create({
        data:{
            nombre:ubicacion.nombre,
            responsable_id:ubicacion.responsable_id
        }
    })
}
export const ubicacionRepositorio:UbicacionRepositorio = {
    crearUbicacion: crearUbicacion
}
