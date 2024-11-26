export class ResponseListadoPaginado<T> {
    data: T[];
    pagina: number;
    existePaginaSiguiente: boolean;
    total: number;
  
    constructor(
      data: T[],
      pagina: number,
      existePaginaSiguiente: boolean,
      total: number
    ) {
      this.data = data;
      this.pagina = pagina;
      this.existePaginaSiguiente = existePaginaSiguiente;
      this.total = total;
    }
  }
  