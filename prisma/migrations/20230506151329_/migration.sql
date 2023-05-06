/*
  Warnings:

  - You are about to alter the column `codigo` on the `equipo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `descripcion` on the `equipo` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - Added the required column `fechaactualizacion` to the `equipo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modelo` to the `equipo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serie` to the `equipo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `equipo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "enumstatus" AS ENUM ('activo', 'inactivo');

-- CreateEnum
CREATE TYPE "enum_tipo_actividad" AS ENUM ('calibracion', 'verificacion', 'mantenimiento_correctivo', 'mantenimiento_preventivo', 'operaciones');

-- AlterTable
ALTER TABLE "equipo" ADD COLUMN     "fechaCreacio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fechaactualizacion" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "modelo" VARCHAR(40) NOT NULL,
ADD COLUMN     "serie" VARCHAR(40) NOT NULL,
ADD COLUMN     "status" "enumstatus" NOT NULL,
ALTER COLUMN "codigo" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "descripcion" SET DATA TYPE VARCHAR(60);

-- CreateTable
CREATE TABLE "responsable" (
    "id" TEXT NOT NULL,
    "equipoid" TEXT NOT NULL,
    "alias" VARCHAR(10) NOT NULL,
    "descripcion" VARCHAR(40) NOT NULL,
    "fechaCreacio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaactualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "responsable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ubicacion" (
    "id" TEXT NOT NULL,
    "descripcion" VARCHAR(40) NOT NULL,
    "equipoid" TEXT NOT NULL,
    "responsableid" TEXT NOT NULL,
    "status" "enumstatus" NOT NULL,
    "fechaCreacio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaactualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ubicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marca" (
    "id" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "equipoid" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaactualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "marca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actividad" (
    "id" TEXT NOT NULL,
    "tipo_actividad_id" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaactualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_actividad" (
    "id" TEXT NOT NULL,
    "descripcion" "enum_tipo_actividad" NOT NULL,
    "status" "enumstatus" NOT NULL,
    "fechaCreacio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaactualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equipo_actividad" (
    "id" TEXT NOT NULL,
    "actividad" "enum_tipo_actividad" NOT NULL,
    "equipoId" TEXT NOT NULL,

    CONSTRAINT "equipo_actividad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "responsable_equipoid_key" ON "responsable"("equipoid");

-- CreateIndex
CREATE UNIQUE INDEX "responsable_alias_key" ON "responsable"("alias");

-- CreateIndex
CREATE UNIQUE INDEX "ubicacion_equipoid_key" ON "ubicacion"("equipoid");

-- CreateIndex
CREATE UNIQUE INDEX "ubicacion_responsableid_key" ON "ubicacion"("responsableid");

-- CreateIndex
CREATE UNIQUE INDEX "marca_equipoid_key" ON "marca"("equipoid");

-- CreateIndex
CREATE UNIQUE INDEX "actividad_tipo_actividad_id_key" ON "actividad"("tipo_actividad_id");

-- AddForeignKey
ALTER TABLE "responsable" ADD CONSTRAINT "responsable_equipoid_fkey" FOREIGN KEY ("equipoid") REFERENCES "equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ubicacion" ADD CONSTRAINT "ubicacion_equipoid_fkey" FOREIGN KEY ("equipoid") REFERENCES "equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ubicacion" ADD CONSTRAINT "ubicacion_responsableid_fkey" FOREIGN KEY ("responsableid") REFERENCES "responsable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marca" ADD CONSTRAINT "marca_equipoid_fkey" FOREIGN KEY ("equipoid") REFERENCES "equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "actividad" ADD CONSTRAINT "actividad_tipo_actividad_id_fkey" FOREIGN KEY ("tipo_actividad_id") REFERENCES "tipo_actividad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipo_actividad" ADD CONSTRAINT "equipo_actividad_equipoId_fkey" FOREIGN KEY ("equipoId") REFERENCES "equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
