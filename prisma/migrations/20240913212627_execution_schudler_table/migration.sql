-- CreateTable
CREATE TABLE "ejecucion_equipos" (
    "id" TEXT NOT NULL,
    "fecha_ejecucion" TIMESTAMP(3) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cliente_id" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,
    "ejecutor_id" TEXT NOT NULL,

    CONSTRAINT "ejecucion_equipos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ejecucion_equipos_cliente_id_idx" ON "ejecucion_equipos"("cliente_id");

-- AddForeignKey
ALTER TABLE "ejecucion_equipos" ADD CONSTRAINT "ejecucion_equipos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ejecucion_equipos" ADD CONSTRAINT "ejecucion_equipos_ejecutor_id_fkey" FOREIGN KEY ("ejecutor_id") REFERENCES "responsable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
