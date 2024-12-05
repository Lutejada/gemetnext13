export class TerminoDeBusquedaNoExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="El valor de busqueda con ese termino no existe"
        this.cause="negocio"
        this.status = 404;
    }
}