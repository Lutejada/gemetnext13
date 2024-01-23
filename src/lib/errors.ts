export class NoAutorizado extends Error {
    status: number;
    constructor() {
      super();
      this.message = "No Autorizado";
      this.cause = "negocio";
      this.status = 401;
    }
  }
  