-- CreateTable
CREATE TABLE "ejecucion_patrones" (
    "id" TEXT NOT NULL,
    "fecha_ejecucion" TIMESTAMP(3) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cliente_id" TEXT NOT NULL,
    "observaciones" TEXT NOT NULL,
    "ejecutor_id" TEXT NOT NULL,
    "programacion_patron_id" TEXT NOT NULL,

    CONSTRAINT "ejecucion_patrones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ejecucion_patrones_programacion_patron_id_key" ON "ejecucion_patrones"("programacion_patron_id");

-- CreateIndex
CREATE INDEX "ejecucion_patrones_cliente_id_programacion_patron_id_idx" ON "ejecucion_patrones"("cliente_id", "programacion_patron_id");

-- AddForeignKey
ALTER TABLE "ejecucion_patrones" ADD CONSTRAINT "ejecucion_patrones_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ejecucion_patrones" ADD CONSTRAINT "ejecucion_patrones_ejecutor_id_fkey" FOREIGN KEY ("ejecutor_id") REFERENCES "responsable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ejecucion_patrones" ADD CONSTRAINT "ejecucion_patrones_programacion_patron_id_fkey" FOREIGN KEY ("programacion_patron_id") REFERENCES "programacion_patrones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
