"use client";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import SearchForm from "@/components/serch-form";
import { useEffect } from "react";
import Paginador from "../../../../components/paginador";
import { useListarPatrones } from "../../hooks/usePatron";
import { queryValuesDTO } from "@/app/api/common/types";
import { SelectContent, SelectItem } from "@/components/ui/select";
export default function ConsultarPatrones() {
  const {
    obtenerPatrones,
    currenPage,
    patrones,
    existeSiguientePagina,
    isLoading,
  } = useListarPatrones();
  useEffect(() => {
    obtenerPatrones();
  }, []);
  const buscarPorTermino = async (args?: queryValuesDTO) => {
    await obtenerPatrones(args);
  };
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-center mb-4 font-semibold">Consultar Patrones</h2>
      <SearchForm
        buscarPorTermino={buscarPorTermino}
        renderSelectOptions={() => (
          <SelectContent>
            <SelectItem value="codigo">Codigo</SelectItem>
            <SelectItem value="descripcion">Descripción</SelectItem>
          </SelectContent>
        )}
      />
      <DataTable columns={columns} data={patrones} isLoading={isLoading} />
      <Paginador
        currentPage={currenPage}
        obtenervalores={obtenerPatrones}
        existeSiguientePagina={existeSiguientePagina}
      />
    </div>
  );
}
