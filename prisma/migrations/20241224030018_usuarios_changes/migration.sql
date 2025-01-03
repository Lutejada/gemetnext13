-- DropIndex
DROP INDEX "usuario_cliente_id_idx";

-- CreateIndex
CREATE INDEX "usuario_cliente_id_correo_idx" ON "usuario"("cliente_id", "correo");
