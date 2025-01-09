export class UsuarioNoExiste extends Error {
  status: number;
  constructor() {
    super();
    this.message = "El Usuario no existe";
    this.cause = "negocio";
    this.status = 400;
  }
}
export class UsuarioExiste extends Error {
  status: number;
  constructor() {
    super();
    this.message = "El Usuario ya existe";
    this.cause = "negocio";
    this.status = 400;
  }
}
export class InvalidUserRole extends Error {
  status: number;
  constructor() {
    super();
    this.message = "No es posible crear un usario admin";
    this.cause = "negocio";
    this.status = 401;
  }
}
