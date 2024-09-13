-- CreateEnum
CREATE TYPE "EstadoProgramacion" AS ENUM ('PENDIENTE', 'COMPLETADO');

-- AlterTable
ALTER TABLE "programacion_equipos" ADD COLUMN     "estado" "EstadoProgramacion" NOT NULL DEFAULT 'PENDIENTE';
