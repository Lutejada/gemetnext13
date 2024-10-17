export class ActividadNoExiste extends Error {
  status: number;
  constructor() {
    super();
    this.message = "La actividad con ese ID no existe";
    this.cause = "negocio";
    this.status = 400;
  }
}
