-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Metrologo', 'Auxiliar', 'Consulta', 'Cordinador');

-- CreateEnum
CREATE TYPE "cumple" AS ENUM ('SI', 'NO');

-- CreateTable
CREATE TABLE "equipo" (
    "id" TEXT NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "descripcion" VARCHAR(60) NOT NULL,
    "modelo" VARCHAR(40) NOT NULL,
    "serie" VARCHAR(40) NOT NULL,
    "marca_id" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_inactivacion" TIMESTAMP(3),
    "ubicacion_id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "equipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responsable" (
    "id" TEXT NOT NULL,
    "identificacion" VARCHAR(10) NOT NULL,
    "nombre" VARCHAR(40) NOT NULL,
    "apellido" VARCHAR(40) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "responsable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ubicacion" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(40) NOT NULL,
    "responsable_id" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "ubicacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marca" (
    "id" TEXT NOT NULL,
    "identificacion" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaactualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "marca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_actividad" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "tipo_actividad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frecuencia" (
    "id" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "cantidad_dias" INTEGER NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "frecuencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "usuario" VARCHAR(40) NOT NULL,
    "nombre" VARCHAR(40) NOT NULL,
    "apellido" VARCHAR(40) NOT NULL,
    "cargo" VARCHAR(40) NOT NULL,
    "rol" "Role" NOT NULL DEFAULT 'Consulta',
    "correo" VARCHAR(50) NOT NULL,
    "password" VARCHAR(250) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "magnitud" (
    "id" TEXT NOT NULL,
    "alias" VARCHAR(10) NOT NULL,
    "descripcion" VARCHAR(50) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "magnitud_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variable" (
    "id" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "magnitud_id" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "variable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patrones" (
    "id" TEXT NOT NULL,
    "codigo" VARCHAR(20) NOT NULL,
    "descripcion" VARCHAR(60) NOT NULL,
    "modelo" VARCHAR(40) NOT NULL,
    "serie" VARCHAR(40) NOT NULL,
    "marca_id" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "ubicacionId" TEXT NOT NULL,
    "datos_metrologicos_patronesId" TEXT,
    "cliente_id" TEXT NOT NULL,
    "tipo_patron_id" TEXT NOT NULL,

    CONSTRAINT "patrones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datos_metrologicos_equipos" (
    "id" TEXT NOT NULL,
    "equipo_id" TEXT NOT NULL,
    "emp" DOUBLE PRECISION NOT NULL,
    "division_escala" DOUBLE PRECISION NOT NULL,
    "resolucion" DOUBLE PRECISION NOT NULL,
    "rango_minimo" DOUBLE PRECISION NOT NULL,
    "rango_maximo" DOUBLE PRECISION NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "datos_metrologicos_equipos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datos_metrologicos_patrones" (
    "id" TEXT NOT NULL,
    "emp" DOUBLE PRECISION NOT NULL,
    "division_escala" DOUBLE PRECISION NOT NULL,
    "resolucion" DOUBLE PRECISION NOT NULL,
    "rango_minimo" DOUBLE PRECISION NOT NULL,
    "rango_maximo" DOUBLE PRECISION NOT NULL,
    "valor_nominal" DOUBLE PRECISION NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "patrones_id" TEXT NOT NULL,
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "datos_metrologicos_patrones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_patron" (
    "id" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "tipo_patron_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datos_complementarios_equipo" (
    "id" TEXT NOT NULL,
    "descripcion_especificaciones" TEXT,
    "cumple_especificacion_instalaciones" "cumple" NOT NULL DEFAULT 'NO',
    "utiliza_software" "cumple" NOT NULL DEFAULT 'NO',
    "descripcion_software" TEXT,
    "version_software" TEXT,
    "fireware" TEXT,
    "observaciones" TEXT,
    "equipo_id" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "datos_complementarios_equipo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datos_complementarios_patrones" (
    "id" TEXT NOT NULL,
    "descripcion_especificaciones" TEXT,
    "cumple_especificacion_instalaciones" "cumple" NOT NULL DEFAULT 'NO',
    "utiliza_software" "cumple" NOT NULL DEFAULT 'NO',
    "descripcion_software" TEXT,
    "version_software" TEXT,
    "fireware" TEXT,
    "observaciones" TEXT,
    "patron_id" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "datos_complementarios_patrones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programacion_equipos" (
    "id" TEXT NOT NULL,
    "actividad_id" TEXT NOT NULL,
    "frecuencia_id" TEXT NOT NULL,
    "equipo_id" TEXT NOT NULL,
    "fecha_programacion" TIMESTAMP(3) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "programacion_equipos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "programacion_patrones" (
    "id" TEXT NOT NULL,
    "actividad_id" TEXT NOT NULL,
    "frecuencia_id" TEXT NOT NULL,
    "patron_id" TEXT NOT NULL,
    "fecha_programacion" TIMESTAMP(3) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "fecha_inactivacion" TIMESTAMP(3),
    "cliente_id" TEXT NOT NULL,

    CONSTRAINT "programacion_patrones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipo_codigo_key" ON "equipo"("codigo");

-- CreateIndex
CREATE INDEX "equipo_cliente_id_idx" ON "equipo"("cliente_id");

-- CreateIndex
CREATE UNIQUE INDEX "responsable_identificacion_key" ON "responsable"("identificacion");

-- CreateIndex
CREATE INDEX "responsable_cliente_id_idx" ON "responsable"("cliente_id");

-- CreateIndex
CREATE UNIQUE INDEX "ubicacion_nombre_key" ON "ubicacion"("nombre");

-- CreateIndex
CREATE INDEX "ubicacion_cliente_id_idx" ON "ubicacion"("cliente_id");

-- CreateIndex
CREATE INDEX "marca_cliente_id_idx" ON "marca"("cliente_id");

-- CreateIndex
CREATE INDEX "tipo_actividad_cliente_id_idx" ON "tipo_actividad"("cliente_id");

-- CreateIndex
CREATE INDEX "frecuencia_cliente_id_idx" ON "frecuencia"("cliente_id");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_correo_key" ON "usuario"("correo");

-- CreateIndex
CREATE INDEX "usuario_cliente_id_idx" ON "usuario"("cliente_id");

-- CreateIndex
CREATE INDEX "magnitud_cliente_id_idx" ON "magnitud"("cliente_id");

-- CreateIndex
CREATE INDEX "variable_cliente_id_idx" ON "variable"("cliente_id");

-- CreateIndex
CREATE UNIQUE INDEX "patrones_codigo_key" ON "patrones"("codigo");

-- CreateIndex
CREATE INDEX "patrones_cliente_id_idx" ON "patrones"("cliente_id");

-- CreateIndex
CREATE UNIQUE INDEX "datos_metrologicos_equipos_equipo_id_key" ON "datos_metrologicos_equipos"("equipo_id");

-- CreateIndex
CREATE INDEX "datos_metrologicos_equipos_cliente_id_idx" ON "datos_metrologicos_equipos"("cliente_id");

-- CreateIndex
CREATE UNIQUE INDEX "datos_metrologicos_patrones_patrones_id_key" ON "datos_metrologicos_patrones"("patrones_id");

-- CreateIndex
CREATE INDEX "datos_metrologicos_patrones_cliente_id_idx" ON "datos_metrologicos_patrones"("cliente_id");

-- CreateIndex
CREATE INDEX "tipo_patron_cliente_id_idx" ON "tipo_patron"("cliente_id");

-- CreateIndex
CREATE UNIQUE INDEX "datos_complementarios_equipo_equipo_id_key" ON "datos_complementarios_equipo"("equipo_id");

-- CreateIndex
CREATE INDEX "datos_complementarios_equipo_cliente_id_idx" ON "datos_complementarios_equipo"("cliente_id");

-- CreateIndex
CREATE UNIQUE INDEX "datos_complementarios_patrones_patron_id_key" ON "datos_complementarios_patrones"("patron_id");

-- CreateIndex
CREATE INDEX "datos_complementarios_patrones_cliente_id_idx" ON "datos_complementarios_patrones"("cliente_id");

-- CreateIndex
CREATE INDEX "programacion_equipos_cliente_id_idx" ON "programacion_equipos"("cliente_id");

-- CreateIndex
CREATE INDEX "programacion_patrones_cliente_id_idx" ON "programacion_patrones"("cliente_id");

-- CreateIndex
CREATE UNIQUE INDEX "cliente_nombre_key" ON "cliente"("nombre");

-- AddForeignKey
ALTER TABLE "equipo" ADD CONSTRAINT "equipo_marca_id_fkey" FOREIGN KEY ("marca_id") REFERENCES "marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipo" ADD CONSTRAINT "equipo_ubicacion_id_fkey" FOREIGN KEY ("ubicacion_id") REFERENCES "ubicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipo" ADD CONSTRAINT "equipo_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responsable" ADD CONSTRAINT "responsable_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ubicacion" ADD CONSTRAINT "ubicacion_responsable_id_fkey" FOREIGN KEY ("responsable_id") REFERENCES "responsable"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ubicacion" ADD CONSTRAINT "ubicacion_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marca" ADD CONSTRAINT "marca_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tipo_actividad" ADD CONSTRAINT "tipo_actividad_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "frecuencia" ADD CONSTRAINT "frecuencia_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magnitud" ADD CONSTRAINT "magnitud_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variable" ADD CONSTRAINT "variable_magnitud_id_fkey" FOREIGN KEY ("magnitud_id") REFERENCES "magnitud"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variable" ADD CONSTRAINT "variable_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patrones" ADD CONSTRAINT "patrones_marca_id_fkey" FOREIGN KEY ("marca_id") REFERENCES "marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patrones" ADD CONSTRAINT "patrones_ubicacionId_fkey" FOREIGN KEY ("ubicacionId") REFERENCES "ubicacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patrones" ADD CONSTRAINT "patrones_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patrones" ADD CONSTRAINT "patrones_tipo_patron_id_fkey" FOREIGN KEY ("tipo_patron_id") REFERENCES "tipo_patron"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datos_metrologicos_equipos" ADD CONSTRAINT "datos_metrologicos_equipos_equipo_id_fkey" FOREIGN KEY ("equipo_id") REFERENCES "equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datos_metrologicos_equipos" ADD CONSTRAINT "datos_metrologicos_equipos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datos_metrologicos_patrones" ADD CONSTRAINT "datos_metrologicos_patrones_patrones_id_fkey" FOREIGN KEY ("patrones_id") REFERENCES "patrones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datos_metrologicos_patrones" ADD CONSTRAINT "datos_metrologicos_patrones_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tipo_patron" ADD CONSTRAINT "tipo_patron_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datos_complementarios_equipo" ADD CONSTRAINT "datos_complementarios_equipo_equipo_id_fkey" FOREIGN KEY ("equipo_id") REFERENCES "equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datos_complementarios_equipo" ADD CONSTRAINT "datos_complementarios_equipo_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datos_complementarios_patrones" ADD CONSTRAINT "datos_complementarios_patrones_patron_id_fkey" FOREIGN KEY ("patron_id") REFERENCES "patrones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "datos_complementarios_patrones" ADD CONSTRAINT "datos_complementarios_patrones_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programacion_equipos" ADD CONSTRAINT "programacion_equipos_actividad_id_fkey" FOREIGN KEY ("actividad_id") REFERENCES "tipo_actividad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programacion_equipos" ADD CONSTRAINT "programacion_equipos_frecuencia_id_fkey" FOREIGN KEY ("frecuencia_id") REFERENCES "frecuencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programacion_equipos" ADD CONSTRAINT "programacion_equipos_equipo_id_fkey" FOREIGN KEY ("equipo_id") REFERENCES "equipo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programacion_equipos" ADD CONSTRAINT "programacion_equipos_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programacion_patrones" ADD CONSTRAINT "programacion_patrones_actividad_id_fkey" FOREIGN KEY ("actividad_id") REFERENCES "tipo_actividad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programacion_patrones" ADD CONSTRAINT "programacion_patrones_frecuencia_id_fkey" FOREIGN KEY ("frecuencia_id") REFERENCES "frecuencia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programacion_patrones" ADD CONSTRAINT "programacion_patrones_patron_id_fkey" FOREIGN KEY ("patron_id") REFERENCES "patrones"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "programacion_patrones" ADD CONSTRAINT "programacion_patrones_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
