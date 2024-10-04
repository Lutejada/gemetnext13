/*
  Warnings:

  - A unique constraint covering the columns `[programacion_equipo_id]` on the table `ejecucion_equipos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `programacion_equipo_id` to the `ejecucion_equipos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ejecucion_equipos_cliente_id_idx";

-- AlterTable
ALTER TABLE "ejecucion_equipos" ADD COLUMN     "programacion_equipo_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ejecucion_equipos_programacion_equipo_id_key" ON "ejecucion_equipos"("programacion_equipo_id");

-- CreateIndex
CREATE INDEX "ejecucion_equipos_cliente_id_programacion_equipo_id_idx" ON "ejecucion_equipos"("cliente_id", "programacion_equipo_id");

-- AddForeignKey
ALTER TABLE "ejecucion_equipos" ADD CONSTRAINT "ejecucion_equipos_programacion_equipo_id_fkey" FOREIGN KEY ("programacion_equipo_id") REFERENCES "programacion_equipos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
