export class MarcaNoExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="La marca con ese ID no existe"
        this.cause="negocio"
        this.status = 404;
    }
}