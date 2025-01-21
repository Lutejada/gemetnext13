export class PasswordOrEmailIncorrect extends Error {
  status: number;
  constructor() {
    super();
    this.message = "El email o la contraseña son incorrectos";
    this.status = 404;
    this.cause = "negocio";
  }
}
export class EmailNotVerified extends Error {
  status: number;
  constructor() {
    super();
    this.message = "Correo no verificado";
    this.status = 404;
    this.cause = "negocio";
  }
}
export class TokenNotExist extends Error {
  status: number;
  constructor() {
    super();
    this.message =
      "No se encontro un usuario asociado para cambio de contraseña";
    this.status = 404;
    this.cause = "negocio";
  }
}
export class TokenExpired extends Error {
  status: number;
  constructor() {
    super();
    this.message = "Token no ya se vencio";
    this.status = 404;
    this.cause = "negocio";
  }
}
