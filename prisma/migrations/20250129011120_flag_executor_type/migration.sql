-- CreateEnum
CREATE TYPE "tipoEjecutor" AS ENUM ('INTERNO', 'EXTERNO');

-- AlterTable
ALTER TABLE "ejecucion_equipos" ADD COLUMN     "tipo_ejecutor" "tipoEjecutor" NOT NULL DEFAULT 'INTERNO';
