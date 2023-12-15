import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ObtenerEquiposDto } from "../../types";

interface Props {
  obtenerEquipos: (args?: ObtenerEquiposDto | undefined) => Promise<any>;
  existeSiguientePagina: boolean;
}
const Paginador = ({ obtenerEquipos, existeSiguientePagina }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const siguientePagina = async () => {
    setCurrentPage(currentPage + 1);
    await obtenerEquipos({ page: currentPage + 1 });
  };

  const paginaAnterior = async () => {
    const page = Math.max(currentPage - 1, 1);
    setCurrentPage(page);
    await obtenerEquipos({ page });
  };
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={paginaAnterior}
        disabled={currentPage === 1}
      >
        Anterior
      </Button>
      <Button className="cursor-auto" variant="secondary">{currentPage}</Button>
      <Button
        variant="outline"
        size="sm"
        onClick={siguientePagina}
        disabled={!existeSiguientePagina}
      >
        Siguiente
      </Button>
    </div>
  );
};

export default Paginador;
