-- AlterTable
ALTER TABLE "ejecucion_equipos" ADD COLUMN     "documentos" TEXT[] DEFAULT ARRAY[]::TEXT[];
