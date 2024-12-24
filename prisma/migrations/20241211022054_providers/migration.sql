-- CreateEnum
CREATE TYPE "TipoIdentificacion" AS ENUM ('NIT');

-- CreateTable
CREATE TABLE "proveedor" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "tipoIdetificacion" "TipoIdentificacion" NOT NULL DEFAULT 'NIT',
    "numeroIdentificacion" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "telefono" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,

    CONSTRAINT "proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "proveedor_clienteId_idx" ON "proveedor"("clienteId");

-- AddForeignKey
ALTER TABLE "proveedor" ADD CONSTRAINT "proveedor_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
