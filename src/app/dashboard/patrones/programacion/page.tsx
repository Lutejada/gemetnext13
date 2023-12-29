"use client";
import { columns } from "./columns";
import { DataTable } from "../../../../../components/data-table";
import SearchForm from "@/components/serch-form";
import { useEffect, useState } from "react";
import Paginador from "@/components/paginador";
import { obtenerProgramacionPatrones } from "../../hooks/usePatron";
export default function Programacion() {
  const { obtenerPatrones, patrones, existeSiguientePagina } =
    obtenerProgramacionPatrones();
  useEffect(() => {
    obtenerPatrones();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center mb-4 font-semibold">
        Programacion de patrones
      </h2>

      <DataTable columns={columns} data={patrones} />
      <Paginador
        obtenervalores={obtenerPatrones}
        existeSiguientePagina={existeSiguientePagina}
      />
    </div>
  );
}
