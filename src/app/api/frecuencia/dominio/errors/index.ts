export class FrecuenciaNoExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="La frecuencia con ese ID no existe"
        this.cause="negocio"
        this.status = 400;
    }
}