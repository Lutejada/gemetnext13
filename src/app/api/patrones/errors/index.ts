export class PatronYaExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="El Patron con ese codigo ya existe"
        this.cause="negocio"
        this.status = 400;
    }
}