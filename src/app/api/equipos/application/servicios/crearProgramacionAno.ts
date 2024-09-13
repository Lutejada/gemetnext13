import { CrearProgramacionEquipoDto } from "../dtos/crearProgramation.dto";
import { getYear, addDays } from "date-fns";

export const crearProgramacionAno = (
  dto: CrearProgramacionEquipoDto
): CrearProgramacionEquipoDto[] => {
  const dtoList: CrearProgramacionEquipoDto[] = [
    {
      actividadId: dto.actividadId,
      codigo: dto.codigo,
      equipoId: dto.equipoId,
      fechaProgramacion: dto.fechaProgramacion,
      frecuenciaId: dto.frecuenciaId,
    },
  ];
  const initialDate = new Date(dto.fechaProgramacion);
  const currentYear = getYear(initialDate);
  let yearOfTheNextDate = currentYear;
  let auxDate = initialDate;
  while (currentYear >= yearOfTheNextDate) {
    const nextDate = addDays(auxDate, 30);
    auxDate = nextDate;
    dtoList.push({
      actividadId: dto.actividadId,
      codigo: dto.codigo,
      equipoId: dto.equipoId,
      fechaProgramacion: nextDate.toISOString(),
      frecuenciaId: dto.frecuenciaId,
    });
    yearOfTheNextDate = getYear(addDays(nextDate, 30));
  }
  return dtoList;
};
