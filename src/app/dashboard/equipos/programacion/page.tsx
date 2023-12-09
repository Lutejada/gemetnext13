"use client";
import { obtenerProgramacionEquipos } from "../../hooks/useEquipo";
import { columns } from "./columns";
import { DataTable } from "../../../../../components/data-table";
import SearchForm from "@/components/serch-form";
import { useEffect, useState } from "react";
export default function Programacion() {
  const { obtenerEquipos, equipos } = obtenerProgramacionEquipos();
  useEffect(() => {
    obtenerEquipos();
  }, []);
  
  return (
    <div className="container mx-auto py-10">
      {/* <SearchForm buscarPorTermino={obtenerEquipos} /> */}
      <DataTable columns={columns} data={equipos} />
      {/* {equipos.length === 0 ? (
        <p>cargando</p>
      ) : (
        <DataTable columns={columns} data={equipos} />
      )} */}
    </div>
  );
}
