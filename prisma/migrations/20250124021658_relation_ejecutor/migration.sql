/*
  Warnings:

  - You are about to drop the column `ejecutor_id` on the `ejecucion_equipos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ejecucion_equipos" DROP CONSTRAINT "ejecucion_equipos_ejecutor_id_fkey";

-- AlterTable
ALTER TABLE "ejecucion_equipos" DROP COLUMN "ejecutor_id",
ADD COLUMN     "proveedor_id" TEXT,
ADD COLUMN     "usuario_id" TEXT;

-- AddForeignKey
ALTER TABLE "ejecucion_equipos" ADD CONSTRAINT "ejecucion_equipos_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ejecucion_equipos" ADD CONSTRAINT "ejecucion_equipos_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
