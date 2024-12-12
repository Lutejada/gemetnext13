/*
  Warnings:

  - A unique constraint covering the columns `[numeroIdentificacion]` on the table `proveedor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "proveedor_clienteId_idx";

-- CreateIndex
CREATE UNIQUE INDEX "proveedor_numeroIdentificacion_key" ON "proveedor"("numeroIdentificacion");

-- CreateIndex
CREATE INDEX "proveedor_clienteId_numeroIdentificacion_idx" ON "proveedor"("clienteId", "numeroIdentificacion");
