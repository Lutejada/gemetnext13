import { equipoRepositorio } from "../repositorio/equipoRepositorio";
interface obtenerEquiposDto {
  termino?: string | null;
  valor?: string | null;
  page: number;
}

export const obtenerEquipos = async (
  dto: obtenerEquiposDto,
  clienteId: string
) => {
  const { termino, valor, page } = dto;
  if (termino && valor) {
    const equipoTermino = await equipoRepositorio.obtenerEquiposPorCodigo(
      valor
    );
    return equipoTermino;
  }
  return equipoRepositorio.obtenerEquipos(clienteId, page);
};
