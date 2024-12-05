"use client";
import { useListarEquipos } from "../../hooks/useEquipo";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import SearchForm from "@/components/serch-form";
import { useEffect } from "react";
import Paginador from "../../../../components/paginador";
import { SelectContent, SelectItem } from "@/components/ui/select";
import { queryValuesDTO } from "@/app/api/common/types";
export default function ConstultarEquipos() {
  const { obtenerEquipos, equipos, existeSiguientePagina, isLoading, page } =
    useListarEquipos();
  useEffect(() => {
    obtenerEquipos();
  }, []);

  const buscarPorTermino = async (args?: queryValuesDTO) => {
    await obtenerEquipos(args);
  };
  return (
    <div className="container mx-auto py-10">
      <SearchForm
        buscarPorTermino={buscarPorTermino}
        renderSelectOptions={() => (
          <SelectContent>
            <SelectItem value="codigo">Codigo</SelectItem>
            <SelectItem value="descripcion">Descripción</SelectItem>
          </SelectContent>
        )}
      />
      <DataTable columns={columns} data={equipos} isLoading={isLoading} />
      <Paginador
        currentPage={page}
        obtenervalores={obtenerEquipos}
        existeSiguientePagina={existeSiguientePagina}
      />
    </div>
  );
}
