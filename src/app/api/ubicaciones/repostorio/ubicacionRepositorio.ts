import { PrismaClient } from "@prisma/client";
import { UbicacionRepositorio } from ".";
import { crearUbicacionDto } from "../dtos/crearUbicacion.dto";
import { Ubicacion } from "../types";
import { prisma } from "@/src/lib/prisma";

const crearUbicacion =async (ubicacion: crearUbicacionDto)=>{
    const prisma = new PrismaClient();
    return prisma.ubicacion.create({
        data:{
            nombre:ubicacion.nombre,
            responsable_id:ubicacion.responsable_id
        }
    })
}

const obtenerUbicacionPorResponsableId =(responsable_id:string)=>{
    const prisma = new PrismaClient();
    return prisma.ubicacion.findUnique({
        where:{
            responsable_id
        }
    })
}
export const ubicacionRepositorio:UbicacionRepositorio = {
    crearUbicacion: crearUbicacion,
    obtenerUbicacionPorResponsableId: obtenerUbicacionPorResponsableId,
    obtenerUbicaciones: function (): Promise<Ubicacion[]> {
        return prisma.ubicacion.findMany()
    }
}
