"use client";
import { obtenerProgramacionEquipos } from "../../hooks/useEquipo";
import { columns } from "./columns";
import { DataTable } from "../../../../../components/data-table";
import SearchForm from "@/components/serch-form";
import { useEffect, useState } from "react";
import Paginador from "@/components/paginador";
export default function Programacion() {
  const { obtenerEquipos, equipos, existeSiguientePagina } =
    obtenerProgramacionEquipos();
  useEffect(() => {
    obtenerEquipos();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center mb-4 font-semibold">
        Programacion de equipos
      </h2>

      <DataTable columns={columns} data={equipos} />
      <Paginador
        obtenervalores={obtenerEquipos}
        existeSiguientePagina={existeSiguientePagina}
      />
    </div>
  );
}
