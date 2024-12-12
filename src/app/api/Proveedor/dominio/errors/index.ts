export class ProveedorExiste extends Error{
    status:number
    constructor() {
        super();
        this.message="El proveedor con esa identifiacion existe"
        this.cause="negocio"
        this.status = 400;
    }
}
