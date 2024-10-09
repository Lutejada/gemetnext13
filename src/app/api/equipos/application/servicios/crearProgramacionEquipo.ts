import { CrearProgramacionEquipoDto } from "../dtos/crearProgramation.dto";
import { EquipoNoExiste } from "../../dominio/errors";
import { crearProgramacionPorFrecuencia } from "./crearProgramacionAno";
import { validarEquipoExiste } from "./validarEquipoExiste";
import { equipoRepositorio } from "../../infrastructure/equipoRepositorio";
import { FrecuenciaRepositoryReadImp } from "@/app/api/frecuencia/infraestructure/repository/read/frecuenciaRepoImp";
const repo = new FrecuenciaRepositoryReadImp();
export const crearProgramacionEquipos = async (
  dto: CrearProgramacionEquipoDto,
  clienteId: string
) => {
  const equipoExiste = await validarEquipoExiste(dto.codigo, clienteId);
  if (!equipoExiste) {
    throw new EquipoNoExiste();
  }

  const frecuencia = await repo.obtenerFrecuenciaPorId(
    dto.frecuenciaId,
    clienteId
  );

  if (!frecuencia) {
    throw new Error("Frecuencia no existe");
  }

  const programacionListado = crearProgramacionPorFrecuencia(
    dto,
    frecuencia.cantidad_dias
  );

  return equipoRepositorio.crearProgramacionEquipo(
    programacionListado,
    clienteId
  );
};
