/*
  Warnings:

  - You are about to drop the column `ejecutor_id` on the `ejecucion_patrones` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ejecucion_patrones" DROP CONSTRAINT "ejecucion_patrones_ejecutor_id_fkey";

-- AlterTable
ALTER TABLE "ejecucion_patrones" DROP COLUMN "ejecutor_id",
ADD COLUMN     "proveedor_id" TEXT,
ADD COLUMN     "tipo_ejecutor" "tipoEjecutor" NOT NULL DEFAULT 'INTERNO',
ADD COLUMN     "usuario_id" TEXT;

-- AddForeignKey
ALTER TABLE "ejecucion_patrones" ADD CONSTRAINT "ejecucion_patrones_proveedor_id_fkey" FOREIGN KEY ("proveedor_id") REFERENCES "proveedor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ejecucion_patrones" ADD CONSTRAINT "ejecucion_patrones_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
