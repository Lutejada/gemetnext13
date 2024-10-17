export class ProgramacionYaExiste extends Error {
  status: number;
  constructor() {
    super();
    this.message =
      "La programacion con esa actividad y esa frecuencia ya existe";
    this.cause = "negocio";
    this.status = 400;
  }
}
