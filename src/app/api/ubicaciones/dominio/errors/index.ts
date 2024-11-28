export class ResponsableNoExiste extends Error {
  status: number;
  constructor() {
    super();
    this.message = "El responsable con esa identificacion ya no existe";
    this.cause = "negocio";
    this.status = 400;
  }
}

export class ResponsableYaTieneUbicacion extends Error {
  status: number;
  constructor() {
    super();
    this.message = "El responsable con ese ID ya tiene una ubicacion asignada";
    this.cause = "negocio";
    this.status = 400;
  }
}
export class UbicacionExiste extends Error {
  status: number;
  constructor() {
    super();
    this.message = "Esa Ubicacion ya tiene un responsable asignado";
    this.cause = "negocio";
    this.status = 400;
  }
}
export class UbicacionNoExiste extends Error {
  status: number;
  constructor() {
    super();
    this.message = "Esa Ubicacion con ese Id No existe";
    this.cause = "negocio";
    this.status = 404;
  }
}
